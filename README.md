recipe-notes/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .github/
│   └── workflows/
│       └── gh-pages.yml            # ← 用 GitHub Pages 就加它
└── src/
    ├── assets/
    │   └── images/
    │       ├── tomato.jpg
    │       ├── avocado-toast.jpg    # 酪梨吐司
    │       ├── ramen.jpg            # 日式拉麵
    │       ├── sushi-roll.jpg       # 壽司捲
    │       ├── pancake.jpg          # 鬆餅
    │       ├── PestoChickenPasta.jpg          # 青醬雞胸義麵
    │       ├── GarlicButterShrimp.jpg          # 蒜香奶油蝦
    │       ├── KimchiFriedRice.jpg          # 韓式泡菜炒飯
    │       ├── ThaiGreenCurryChicken.jpg          # 泰式綠咖哩雞
    │       ├── GarlicRoastedPotatoes.jpg          # 蒜香烤馬鈴薯
    │       └── salad.jpg            # 凱撒沙拉
    ├── components/
    │   ├── AniCounter.jsx
    │   ├── AspectBox.jsx
    │   ├── Carousel.jsx
    │   ├── Container.jsx
    │   ├── CuteBand.jsx
    │   ├── CategoryCard.jsx
    │   ├── DataReset.jsx
    │   ├── EmptyState.jsx
    │   ├── ErrorBoundary.jsx
    │   ├── FavoriteButton.jsx
    │   ├── FloatingIcons.jsx
    │   ├── Navbar.jsx
    │   ├── Pagination.jsx
    │   ├── RecipeCard.jsx
    │   ├── SearchBar.jsx
    │   ├── ThemeToggle.jsx
    │   ├── SectionHeader.jsx
    │   ├── Badge.jsx
    │   ├── Newsletter.jsx
    │   ├── Breadcrumbs.jsx
    │   ├── StarRating.jsx
    │   ├── ShareButtons.jsx
    │   ├── LightboxModal.jsx
    │   ├── SkeletonCard.jsx
    │   ├── Reveal.jsx
    │   ├── StatPill.jsx
    │   ├── IngredientList.jsx
    │   ├── StepTimeline.jsx
    │   ├── StatGrid.jsx
    │   ├── ProtectedRoute.jsx      # 登入保護路由
    │   ├── ToastHost.jsx           # 放 Toaster
    │   ├── ClipboardButton.jsx     # 一鍵複製連結
    │   ├── QRCodeButton.jsx        # 彈 QR Code 分享
    │   └── Footer.jsx
    ├── context/
    │   ├── AuthProvider.jsx        # 假登入（localStorage 持久）
    │   ├── UiStore.jsx             # UI/標籤選擇/瀏覽歷史
    │   └── RecipeProvider.jsx       ← **新增更多 recipes 資料**
    ├── hooks/
    │   └── useLocalStorage.js
    ├── pages/
            └── admin/
                └── RecipeForm.jsx  # 新增/編輯食譜（含 Rich Text 步驟）
    │   ├── About.jsx
    │   ├── BackToTop.jsx
    │   ├── Categories.jsx           # 分類/標籤清單 & 篩選
    │   ├── Favorites.jsx
    │   ├── Home.jsx                 ← **調整加入精選區塊**
    │   ├── Login.jsx                # 登入頁
    │   ├── NotFound.jsx
    │   ├── NoteEditor.jsx
    │   ├── Notes.jsx
    │   ├── RecipeDetail.jsx
    │   └── Recipes.jsx
    ├── utils/
    │   └── formatDate.js
    ├── App.jsx
    ├── main.jsx
    └── index.css