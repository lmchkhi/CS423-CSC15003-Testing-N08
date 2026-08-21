const path = require("path");
const sqlite3 = require(path.join(__dirname, "..", "..", "..", "src", "eshop-sut", "backend", "node_modules", "sqlite3")).verbose();

const databasePath = path.join(__dirname, "..", "..", "..", "src", "eshop-sut", "backend", "database.sqlite");
const db = new sqlite3.Database(databasePath);

db.serialize(() => {
  db.get("SELECT COUNT(*) AS count FROM products", [], (beforeError, beforeRow) => {
    if (beforeError) throw beforeError;
    db.run("DELETE FROM products", [], function (deleteError) {
      if (deleteError) throw deleteError;
      db.get("SELECT COUNT(*) AS count FROM products", [], (afterError, afterRow) => {
        if (afterError) throw afterError;
        console.log(JSON.stringify({
          databasePath,
          before: beforeRow.count,
          deleted: this.changes,
          after: afterRow.count,
        }));
        db.close();
      });
    });
  });
});

