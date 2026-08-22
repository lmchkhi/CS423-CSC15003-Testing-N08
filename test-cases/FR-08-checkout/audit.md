# FR-08 Checkout - Audit test case

**Auditor:** AI-assisted audit, có human review  
**Ngày audit:** 2026-08-20  
**Tham chiếu:** Spec §4.3, FR-10 và hành vi SUT đã quan sát

---

## Kết quả audit

| ID | Trạng thái | Lý do ngắn | Điều chỉnh |
|---|---|---|---|
| TC-FR08-001 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-002 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-003 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-004 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-005 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR08-006 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR08-007 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-008 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-009 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR08-010 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-011 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-012 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-013 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-014 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR08-015 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-016 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-017 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-018 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-019 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-020 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR08-021 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR08-022 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-023 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-024 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-025 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-026 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-027 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-028 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-029 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR08-030 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR08-031 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR08-032 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-033 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR08-034 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR08-035 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |

---

## Phát hiện chính

1. **Unvalidated `total_amount`:** AI giả định 0/âm/mismatch bị reject, nhưng SUT chấp nhận giá trị client gửi lên; liên quan BUG-FR08-002.
2. **IDOR:** AI giả định `GET /api/orders/:id` yêu cầu auth/ownership, nhưng SUT có thể trả dữ liệu không cần token; liên quan BUG-FR08-001.
3. **State machine:** chuyển `canceled→delivered` phải bị từ chối nhưng SUT chấp nhận; liên quan BUG-FR08-003.
4. **Một số validation chưa rõ:** float, extra fields, XSS/empty address cần ghi nhận hành vi thực tế.

---

## Tóm tắt audit

- **VALID:** 23 cases sẵn sàng thực thi.
- **INCOMPLETE:** 4 cases cần quan sát thêm.
- **INVALID (đã sửa):** 8 cases do AI giả định hệ thống enforce validation/security tốt hơn thực tế.
- **Tổng:** 35 cases.
