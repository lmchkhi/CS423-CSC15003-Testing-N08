import type {
  FullConfig, FullResult, Reporter, Suite, TestCase, TestResult, TestStep, TestError
} from '@playwright/test/reporter';
import fs from 'node:fs';

//Given by Google AI from search
const ansiRegex = new RegExp('[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))', 'g');

function cleanErrorMessage(error: TestError): string {
    const rawMessage = error.message || error.value || '';
    // Strip ANSI color codes to get clean text
    let cleanMessage = rawMessage.replace(ansiRegex, '');
    let startIndex = cleanMessage.indexOf('Expected');
    return startIndex !== -1 ? cleanMessage.substring(startIndex) : cleanMessage;
}

class BugReport implements Reporter {
    private outputFilePrefix: string;
    private outputFolder: string;
    private encoding = 'utf8';
    constructor(options: { outputFolder?: string; outputFilePrefix?: string } = {}) {
        if (!fs.existsSync(options.outputFolder || 'bug-reports')) {
            fs.mkdirSync(options.outputFolder || 'bug-reports', { recursive: true });
        }
        this.outputFolder = options.outputFolder || 'bug-reports';
        this.outputFilePrefix = (options.outputFilePrefix || '');
    }

    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'failed' || result.status === 'timedOut') {
            let current_outputFileName = this.outputFolder;
            if (test.parent.project()?.name) {

                current_outputFileName = `${this.outputFolder}/${test.parent.project()?.name}`;
                if (!fs.existsSync(current_outputFileName)) {
                    fs.mkdirSync(current_outputFileName, { recursive: true });
                }
            }
            let fileName = `${current_outputFileName}/${this.outputFilePrefix}${test.parent.title}_${test.title}.md`;
            
            let file = fs.openSync(fileName, 'w');

            fs.appendFileSync(file, `# Bug Report: ${test.title}\n\n`, this.encoding);

        
            fs.appendFileSync(file, `## Status\n\n${result.status}\n\n`, this.encoding);
            fs.appendFileSync(file, `## Test result\n\n${result.error ? cleanErrorMessage(result.error) : 'No test error found'}\n\n`, this.encoding);
            fs.appendFileSync(file, `## Error on line\n\n${result.error?.location?.line }\n\n`, this.encoding);
            fs.appendFileSync(file, `## Duration\n\n${result.duration}ms\n\n`, this.encoding);

            
            fs.appendFileSync(file, `## Play wright steps\n\n`, this.encoding);
            for (const step of result.steps) {
                if (step.title === 'Before Hooks' || step.title === 'After Hooks' || step.title === 'Worker Cleanup') {
                    continue;
                }
                fs.appendFileSync(file, `### Step${step.title}\n\n`, this.encoding);
                fs.appendFileSync(file, `- Duration: ${step.duration}ms\n`, this.encoding);
                fs.appendFileSync(file, `- Status: ${step.error ? 'failed' : 'passed'}\n\n`, this.encoding);
                if (step.error && step.error.cause) {
                    fs.appendFileSync(file, `- Error: ${step.error.cause}\n\n`, this.encoding);
                }
                if (step.steps.length > 0) {
                    fs.appendFileSync(file, `- Substeps:\n\n`, this.encoding);  
                    fs.appendFileSync(
                        file,
                        `  - ${step.steps.map(substep => `Step: ${substep.title}, Duration: ${substep.duration}ms, Status: ${substep.error ? 'failed' : 'passed'}`).join('\n  - ')}\n`, 
                        this.encoding
                    );
                }
            }
            fs.closeSync(file);
        }
    }


    printsToStdio(){
        return true;
    }
}

export default BugReport;