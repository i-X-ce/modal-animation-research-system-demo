<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AI Agent Instructions for Next.js Project

以下のルールを厳守してコードの提案、生成、リファクタリングを行ってください。

## 1. ディレクトリ構造と依存関係 (Architecture & Imports)

- **兄弟ディレクトリからのインポート禁止:**
  `../` などを利用して、兄弟フォルダからモジュールをインポートすることは避けてください。インポートは自身の子孫ディレクトリ（`./` 以下）、またはルートから許可された共通モジュール（`@/`）のみを使用してください。
- **ページ = 独立したプロジェクトとしての境界:**
  このプロジェクトでは「ページの区分け」が「プロジェクト（ドメイン）の区分け」を意味します。あるページ専用のコンポーネントやロジックを、別のページから横断的にインポートしてはいけません。
- **ルート `components/` の厳格な運用:**
  ルート直下の `components/` ディレクトリには、複数のページ間で確実に共有される「真の最小単位（UIパーツなど）」のみを配置してください。特定のドメインに依存するコンポーネントは絶対に置かないでください。

## 2. UI と スタイリング (UI & Styling)

- **UIライブラリの徹底活用:**
  プロジェクトに導入されている UI ライブラリ（コンポーネント群）を最優先で使用してください。
- **独自スタイリングの禁止:**
  独自のスタイルを当てること（カスタムCSSの追加や、無秩序なユーティリティクラスの直書きなど）は極力避けてください。要件を満たすために、まずは既存コンポーネントの Props やテーマシステムで解決できないか検討してください。

## 3. 型安全性と Single Source of Truth (Type Safety & Validation)

- **TypeScript の厳格な運用:**
  `any` や `ts-ignore` の使用は厳禁です。常に厳格な型推論・型定義を行ってください。

## 4. ページ・ディレクトリ固有のルール (Directory-Specific Rules)

- **ローカル README の優先確認:**
  各ページや機能ディレクトリ（例: `app/xxx/` 配下や `features/xxx/` 配下）のファイルを編集・生成する際は、**必ず最初にそのディレクトリ内に存在する `README.md` を読み込んでください。**
- **コンテキストの適用:**
  各ディレクトリの `README.md` には、そのページ特有のドメイン知識、APIの仕様、状態管理のルールなどが記載されています。作業を開始する前にそれらを把握し、コードに反映させてください。
- **局所的ルールの優先:**
  本ファイル（AGENTS.md）の全体ルールと、ディレクトリ固有の `README.md` の内容が競合する場合は、より局所的である `README.md` の指示を優先してください。

<!-- END:nextjs-agent-rules -->
