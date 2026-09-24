# Tài sản hình ảnh

- `assets/references/cai-character.png`: ảnh tham chiếu do gia đình cung cấp; chuẩn ngoại hình Cải.
- `assets/references/adventure-style.png`: ảnh tham chiếu do gia đình cung cấp; dùng cho bìa tập 1.
- `assets/garden-adventure.png`: cảnh mới tạo bằng công cụ imagegen tích hợp, tham chiếu hai ảnh trên; dùng làm cảnh chơi.

## Prompt đã dùng

Use case: illustration-story. Asset type: background for a children's point-and-click adventure browser game, ultra-wide landscape 1536x1024. Input image 1 is character reference for Cai, a Vietnamese boy age six with short black hair, navy blue t-shirt with car motif, navy shorts and little backpack. Input image 2 is visual style reference only: gorgeous cute dimensional animated-movie miniature garden, tactile leaves and soft fur. Create a NEW playable garden scene: sunlit miniature vegetable garden seen from a gently elevated storybook angle, a winding sandy path passing through the center, giant round cabbages and mushrooms, a little leaf-built broken toy wagon to the lower right, a wooden tiny bridge in middle distance over a narrow blue stream, friendly rotund green caterpillar near right side with an embarrassed sweet expression and subtle pastel puff, boy Cai and cute golden hamster together on left third looking toward the garden. The boy looks like the supplied character. Cozy lush colorful garden with detailed lush foliage framing the edges, sunlight rays, blue sky in upper quarter, clear generous uncluttered central path to overlay clickable game objects. Whimsical funny warmth, rounded shapes, rich soft green and golden palette, polished cinematic 3D storybook render. No text, no UI, no border, no scary animals, no gross slime, no flies, no watermark. The image is an immersive background, not a screenshot of an interface.

## Giới hạn

Một tranh nền chung cho bản thử. Bộ phận xe, điểm tương tác, giao diện và chuyển động được dựng trong code; chưa có bộ sprite nhân vật riêng. Các ảnh tham chiếu được giữ trong dự án để phát triển tiếp, không cần đưa ảnh hồ sơ đầy đủ lên bản phát hành công khai.

## Bộ tranh truyện “Đêm Đom Đóm Mất Sáng”

14 tranh tại `assets/stories/firefly/page-01.webp` đến `page-14.webp` được tạo riêng bằng công cụ imagegen tích hợp. Mỗi lượt dùng hai ảnh tham chiếu:

- `assets/references/cai-character.png`: khoá nhận diện khuôn mặt, tóc, áo xanh hình ô tô, quần short, giày và ba lô của Cải.
- `assets/references/adventure-style.png`: tham chiếu chất lượng 3D storybook, vật liệu mềm, khu vườn tí hon; không sao chép bố cục.

Prompt chung: tranh truyện thiếu nhi toàn màn hình tỉ lệ 3:2, hoạt hình 3D điện ảnh mềm mại; đêm xanh tím cân bằng bằng ánh vàng ấm; biểu cảm rõ; nhân vật lặp lại nhất quán; dành khoảng yên ở phần tư dưới cho lớp chữ HTML; không chữ trong ảnh, logo, UI, viền, watermark, cảnh kinh dị, sinh vật đe doạ, chất bẩn hoặc chất nhầy. Mô tả cảnh cụ thể của từng trang nằm trong `docs/STORY_01_SCRIPT.md`.

PNG tạo ban đầu được chuyển sang WebP chất lượng 84 để toàn bộ 14 trang giảm từ khoảng 32 MB xuống khoảng 2.9 MB, giúp lật trang mượt hơn. Bản PNG gốc vẫn nằm trong thư mục generated_images của Codex; dự án chỉ tham chiếu các bản WebP.
