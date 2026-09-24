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

## Bộ tranh “Thành Phố Ba Lô”

15 tranh tại `assets/stories/backpack-city/page-01.webp` đến `page-15.webp` được tạo riêng bằng imagegen tích hợp từ ảnh nhận diện của Cải và ảnh tham chiếu chất lượng do gia đình cung cấp. Hệ hình ảnh dùng xanh cobalt, đỏ san hô, vàng nắng và xanh ngọc; thành phố được xây từ ba lô, dây đai, khoá bấm và nhãn tên.

Các trang khoá rõ danh sách nhân vật được phép xuất hiện để tránh nhân vật vào truyện trước lúc được giới thiệu. Thị trưởng Dây Kéo luôn là ba lô đỏ bo tròn với ria dây kéo vàng và huy hiệu sao. Sâu Thối Bủm là sâu xanh ô-liu tròn, ngái ngủ và hài hước; khói được thể hiện bằng hình gối/ngáp mềm mại, không dùng chất nhầy hoặc hình ảnh ghê.

PNG tạo ban đầu được chuyển sang WebP chất lượng 84; cả 15 trang chiếm khoảng 2.8 MB trong dự án. Mô tả cảnh và chỉ dẫn giọng nằm trong `docs/STORY_BACKPACK_CITY.md`.

## Bộ tranh “Cuộc Đua Xe Bay Trên Lồng Mây”

15 tranh tại `assets/stories/sky-race/page-01.webp` đến `page-15.webp` được tạo riêng bằng imagegen tích hợp, dùng ảnh Cải làm tham chiếu nhận diện. Hệ hình ảnh tiếp nối Tập 01 nhưng mở rộng lên một đường đua mây rực rỡ: Ô Tô Gió Lốc xanh cobalt, turbine bạc-xanh, Cánh Sao Chổi vàng-trắng; Sâu Thối Bủm và Xe Hôi Hám tím-xanh giữ vẻ láu cá, hài hước và an toàn với trẻ nhỏ.

Prompt chung yêu cầu tranh truyện thiếu nhi 3D điện ảnh tỉ lệ 3:2, ánh sáng ban ngày trong trẻo, biểu cảm rõ, cảm giác tốc độ vui, không chữ trong ảnh và dành vùng yên ở phần dưới cho lớp chữ HTML. Các cảnh nguy hiểm đều có đệm mây an toàn; khói hôi dùng hình xoắn xanh ngọc, không có chất bẩn hoặc hình ảnh ghê. Mô tả cảnh và chỉ dẫn giọng từng trang nằm trong `docs/STORY_SKY_RACE.md`.

PNG tạo ban đầu được chuyển sang WebP chất lượng 84; cả 15 trang chiếm khoảng 3 MB trong dự án để việc chuyển trang vẫn mượt trên trình duyệt.

## Bộ tranh “Cuộc Thám Hiểm Rừng Lười Biếng”

15 tranh tại `assets/stories/lazy-forest/page-01.webp` đến `page-15.webp` được tạo bằng imagegen tích hợp. Bộ tranh giữ Cải và Ô Tô Gió Lốc từ các tập trước, dùng chất liệu vải chần bông, gối mềm, võng lá và ánh nắng mật ong để biến sự buồn ngủ thành một thế giới hài hước thay vì u ám.

Các cảnh được khoá theo tuyến nhân vật: Thị trưởng Dây Kéo rời truyện ở trang 4; Sên Dài Cổ xuất hiện tại thử thách câu đố; Sâu Thối Bủm chỉ xuất hiện ở khu vực kho báu. Khói ru ngủ là các xoắn xanh ngọc có biểu tượng trăng, sao và gối; hố gối ở cao trào bảo đảm cú ngã hoàn toàn mềm và an toàn.

PNG tạo ban đầu được chuyển sang WebP chất lượng 84; cả 15 trang chiếm khoảng 3,9 MB. Mô tả sản xuất và nhịp truyện nằm trong `docs/STORY_LAZY_FOREST.md`.

## Bộ tranh “Bí Ẩn Biển Bong Bóng”

15 tranh tại `assets/stories/bubble-sea/page-01.webp` đến `page-15.webp` được tạo bằng imagegen tích hợp. Bảng màu dùng xanh ngọc phát sáng, cobalt, vàng ngọc trai và san hô hồng. Trang phục lặn cá heo của Cải và Ô Tô Bơi Bong Bóng được giữ xuyên suốt; cung điện dùng các vòm bong bóng trong suốt và khung vàng.

Hài hước đến từ rap, trò chơi bong bóng, nước hoa hành phi và cú hắt xì. Cá mập có hình tròn, biểu cảm thân thiện và áo mưa vàng; cao trào đưa Sâu Thối Bủm về bờ trong bong bóng bảo vệ, không có thương tích. PNG được chuyển sang WebP chất lượng 84; cả 15 trang chiếm khoảng 5 MB. Chi tiết sản xuất nằm trong `docs/STORY_BUBBLE_SEA.md`.

## Bộ tranh “Thành Phố Ba Lô Nói Chuyện”

15 tranh tại `assets/stories/talking-backpack-city/page-01.webp` đến `page-15.webp` được tạo bằng imagegen tích hợp. Thành phố nối tiếp hệ hình khối ba lô của Tập 01 nhưng đông vui và giàu biểu cảm hơn, với bảng màu cobalt, vàng nắng, đỏ san hô và hồng kẹo. Ô Tô Gió Lốc giữ thiết kế ngôi sao vàng và bánh turbine xanh để nối hình ảnh xuyên series.

Ba thử thách trong Ngõ Đồ Dùng Cáu Kỉnh dùng hình thể tròn và biểu cảm sân khấu để tạo căng thẳng vui: Kéo Biết Cắn bị rồng giấy làm giật mình, Thước Dẻo trở thành dây nhảy, Đèn Pin Thét Gắt hắt xì trước cầu vồng. Tập kết bằng Sâu Thối Bủm cưỡi giày thể thao khổng lồ với luồng tăng tốc xanh bạc hà, mở sang cuộc đua ở Tập 06.

PNG được chuyển sang WebP chất lượng 84; cả 15 trang chiếm khoảng 4,4 MB. Kịch bản và chỉ dẫn lồng tiếng nằm trong `docs/STORY_TALKING_BACKPACK_CITY.md`.
