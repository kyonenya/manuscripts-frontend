[manuscripts.vercel.app](manuscripts.vercel.app)

## これは何のアプリですか

自分が書き溜めている研究草稿を作成・管理するためのウェブアプリ。データベースに格納されている草稿データを[バックエンド](https://github.com/kyonenya/manuscripts-backend)のAPIを介して読み取ったり、マークダウンエディタから記事を作成・編集したりする。フロントエンドはpreactで実装し、vercelでホスティングしている。

### 仕様技術

preact, TypeScript, styled-components (CSS in JS)

### 動機

自分は研究草稿を[DayOne](https://dayoneapp.com/)というiOSの日記アプリで7年ほど書き溜めてきたのだが、このアプリの代わりを自分で作りたいと思ったため。DayOneがリニューアルでエディタをMarkdownではなくリッチテキストにしたのが許容できないのと、記事が3000件以上もあるのでそろそろデータベースで管理すべきだろうと思った。

### なぜpreactなのですか

- ページが少しでも高速で表示されることはそれだけでも価値があるから。
- iPadでNode.jsやnpmが動くplay.jsというアプリで開発しており、限られたCPUの中でビルド時間をなるべく短縮したいから。
- Reactでのやり方をpreactに翻訳するのも勉強だと思うから。

### 記事一覧から個別記事への爆速ページ遷移

- 記事一覧コンポーネント（PageList.tsx）から個別記事コンポーネント（Article.tsx）に記事データを渡しており、ページ遷移時にバックエンドとの通信が発生しないため。個別記事ページに直リンクされた場合やリロードした場合だけ1件取得用のAPIを叩く。
- ルーターを使ってルーティングすると、ルーティング先とのデータのやり取りが断絶してしまいがち。なので、親のManuscriptsコンポーネントにて記事一覧／個別記事への手動ルーティングをしている。

### Markdownエディタ

- [EasyMDE](https://github.com/Ionaru/easy-markdown-editor)のReactラッパーを使用。preactからcompatで互換性をもたせて使っている。
- インラインでマークアップが反映される（つまりCodeMirror/ProseMirror製の）使えるマークダウンエディタはそう多くない。他にはToast UI Editorを使っていた時期もあるが、スマホでの編集に難があったのと、ビルドサイズが1.2MBもあってpreactを使う意味が無いのでやめた。

### 今後追加予定の機能

- 認証機能：個人的な草稿なので非公開にする。Firebase Authか何かでログイン機能を作る。
- 記事の全文検索とタグ検索：まずバックエンドを実装してから

## 参考

- [画面のどこをクリックしても閉じられるドロップダウンメニュー](https://pixelog.net/post/rb8orj/)
