# React + Supabase + Vite + Vitest + Testing Library　+ Chakra UI + Firebase Hosting の学習

## 技術要素
 - React
 - TypeScript
 - Vite
 - Vitest
 - Testing Library
 - GitHub Actions
 - Firebase hosting
 - Supabase
 - Chakra UI V2


## 注意点
- 課題2[react-supabase](https://github.com/sagogoal/react-supabase)で作ったFirebase Hostingのデプロイは、この課題3のデプロイにより上書きされます（同じ環境を使用しているため）
- TASK.mdに、課題リストを記載。V2リポジトリで修正した内容はここを参照

## 勉強になった点
 - vitest + testing-library でのモックの作り方
 - prettier.rcがないとVSCodeやCursorで保存時修正が効かない(settings.jsonにprettierの設定を見るオプションがある

## 手順メモ
- chakraUIはプロバイダー設定をして、各種インストールをすることで利用可能

### 参考にした資料
- [【2024年最新版】0からReactを勉強するならこのロードマップに従え！](https://qiita.com/Sicut_study/items/7d8c6f309dddda1a3961#jisou%E3%81%AE%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E5%8B%9F%E9%9B%86%E4%B8%AD)
  - この記事の課題2を実施
- [Reactに入門した人のためのもっとReactが楽しくなるステップアップコース完全版](https://www.udemy.com/course/react_stepup/)
- [Firebase Hostingのはじめ方（公式）](https://firebase.google.com/docs/hosting?hl=ja)
- [GitHub ActionsでFirebase Hostingに自動デプロイを実装してみた](https://qiita.com/hiroyuki_0507/items/e86b8660c212e7e0cfbd)
- [React Testing Libraryの使い方](https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f)
- [【Reactテスト入門】React Testing Library/Jest/Vitestで学ぶフロントエンドテスト入門](https://www.udemy.com/course/react-frontend-test-tutorial/)
  - ６章のVitest + RTLの環境構築を参考にした。結局色々修正したので、完成系はこのリポジトリを参考
- [cloneしたリポジトリを別リポジトリとしてリモートにpushする](https://qiita.com/SR_midori/items/52730907c1cddeb78b4d)