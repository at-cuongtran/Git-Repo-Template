module.exports.mrTemplate = (content) => {
  return `
  ${content}  
  #### Checklist
  > Lưu ý: Kết quả của Pull Request có thể dẫn đến **bad performance** nếu những điều sau đây không được đảm bảo.
  - [x] Code đã được build và test ở môi trường local.
  - [x] Tất cả những lỗi cơ bản đã được tìm thấy và sửa chữa, ví dụ:
    - App bị crash ngay sau khi khởi chạy.
    - Không tìm thấy trang web sau khi deploy.
    - Các button, link không hoạt động.
    [xem thêm](https://goo.gl/r6hCgW)
`
}

module.exports.PRExample = `
#### References

> Describe what it related

- [Task/Bug URL]()
- [Related PR URL]()

#### Description

> Describe what it implement
> UI Screenshots
> Describe what it changed, added, removed

#### Critical Case

> UI screenshots for Pixel perfect
`
