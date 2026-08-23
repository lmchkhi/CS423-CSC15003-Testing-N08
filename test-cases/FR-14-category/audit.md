# FR-14 Category CRUD - Audit test case

**Auditor:** AI-assisted audit, có human review  
**Ngày audit:** 2026-08-20  
**Tham chiếu:** FR-14, SEC requirements và hành vi SUT đã quan sát

---

## Kết quả audit

| ID | Trạng thái | Lý do ngắn | Điều chỉnh |
|---|---|---|---|
| TC-FR14-001 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-002 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-003 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-004 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-005 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-006 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-007 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-008 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-009 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-010 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR14-011 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-012 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-013 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-014 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-015 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-016 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR14-017 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-018 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-019 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-020 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-021 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-022 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-023 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-024 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-025 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-026 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR14-027 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-028 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR14-029 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-030 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-031 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR14-032 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-033 | INVALID | AI đưa ra giả định quá lạc quan về validation, security hoặc business rule của SUT. | Điều chỉnh expected theo hành vi quan sát được và gắn known bug khi cần. |
| TC-FR14-034 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-035 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-036 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-037 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-038 | VALID | Oracle phù hợp đặc tả và có thể thực thi trực tiếp. | Không cần điều chỉnh. |
| TC-FR14-039 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |
| TC-FR14-040 | INCOMPLETE | Spec hoặc error contract chưa đủ rõ, cần chạy và ghi nhận hành vi thực tế của SUT. | Giữ case ở chế độ quan sát hoặc nới oracle theo nhóm status hợp lệ. |

---

## Phát hiện chính

1. **Role escalation:** AI giả định có kiểm tra role admin, nhưng SUT chỉ kiểm tra token hợp lệ; user thường có thể thao tác category.
2. **Missing resource handling:** AI giả định PUT/DELETE id không tồn tại trả 404, nhưng SUT trả 200 nếu không kiểm tra affected rows.
3. **Uniqueness:** AI giả định tên category trùng bị từ chối, nhưng database không enforce unique.
4. **Validation optimism:** AI giả định empty/whitespace/missing fields bị reject, trong khi SUT có thể chấp nhận nếu không có middleware validation.

---

## Tóm tắt audit

- **VALID:** 21 cases.
- **INVALID:** 6 cases, chủ yếu do giả định sai về role, resource validation và uniqueness.
- **INCOMPLETE:** 13 cases, chủ yếu do validation/auth contract chưa rõ.
- **Tổng:** 40 cases.
