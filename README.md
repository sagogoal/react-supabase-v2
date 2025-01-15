# React + Supabase + Vite + Vitest + Testing Library の学習

## 技術要素
 - React
 - TypeScript
 - Vite
 - Vitest
 - Testing Library
 - GitHub Actions
- Firebase hosting
 - Supabase

## テストコード
 - テストコードはsrc/App.test.jsxに記載しています。
 - VitestとTesting Libraryを使用しています。
 - テストコードはGitHub Actionsで実行されます。
  - テストコードを実行するには、以下のコマンドを実行します。
   ```
   npm run test
   ```

## 注意点
- GithubActionの実行には、GithubにてSecretを設定する必要がある。（.github/workflows/cicd.yml）
- Supabase のanonキーとURLは公開OKのものなのでそのまま記載している。データベースを削除したため利用できない（App.jsxのsupabaseUrlとsupabaseKey）

## 勉強になった点
 - vitest + testing-library の環境構築, テストコードの書き方
  - setup.ts とvite.config.jsの書き方をまずはテンプレートとして覚える
- カバレッジの見方
  - ```"coverage": "vitest run --coverage"``` でカバレッジを見ることができる

### 参考にした資料
- [【2024年最新版】0からReactを勉強するならこのロードマップに従え！](https://qiita.com/Sicut_study/items/7d8c6f309dddda1a3961#jisou%E3%81%AE%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E5%8B%9F%E9%9B%86%E4%B8%AD)
  - この記事の課題2を実施
- [Reactに入門した人のためのもっとReactが楽しくなるステップアップコース完全版](https://www.udemy.com/course/react_stepup/)
- [GitHub ActionsでFirebase Hostingに自動デプロイを実装してみた](https://qiita.com/hiroyuki_0507/items/e86b8660c212e7e0cfbd)
- [React Testing Libraryの使い方](https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f)
- [【Reactテスト入門】React Testing Library/Jest/Vitestで学ぶフロントエンドテスト入門](https://www.udemy.com/course/react-frontend-test-tutorial/)
  - ６章のVitest + RTLの環境構築を参考にした。結局色々修正したので、完成系はこのリポジトリを参考