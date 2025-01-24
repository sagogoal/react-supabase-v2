import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App Component Test", () => {
  it("タイトルが表示されていること", () => {
    render(<App />);
    expect(screen.getByText("学習記録v2")).toBeInTheDocument();
  });

  it("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている", async () => {
    render(<App />);

    // データの読み込み完了を待つ
    await waitFor(() => {
      expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument();
    }, { timeout: 5000 }); // タイムアウトを5秒に設定

    // フォームの入力フィールドとボタンを取得
    const titleInput = screen.getByPlaceholderText("学習内容を入力");
    const timeInput = screen.getByPlaceholderText("学習時間を入力");
    const addButton = screen.getByText("登録");

    // ランダムな文字列を生成
    const timestamp = new Date().getTime();
    const testTitle = `テスト${timestamp}`;

    // 入力とボタン押下
    fireEvent.change(titleInput, { target: { value: testTitle } });
    fireEvent.change(timeInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    // タイムアウトを長めに設定し、より柔軟な待機処理を実装
    await waitFor(
      () => {
        const elements = screen.getAllByText(`${testTitle} : 3時間`);
        expect(elements.length).toBeGreaterThan(0);
      },
      {
        timeout: 5000,    // タイムアウトを5秒に設定
        interval: 1000,   // チェック間隔を1秒に設定
      }
    );
  });

  it("削除ボタンを押すと学習記録が削除される", async () => {
    render(<App />);

    // データの読み込み完了を待つ
    await waitFor(() => {
      expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument();
    });

    // 削除前に対象のli要素を取得
    const listItems = screen.getAllByRole('listitem');
    const targetItem = listItems[0];  // 最初のli要素
    const targetText = targetItem.textContent.replace('削除', '').trim();  // 「削除」ボタンのテキストを除去

    // 削除ボタンをクリック
    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[0]);

    // 特定のli要素が削除されたことを確認
    await waitFor(() => {
      expect(screen.queryByText(targetText)).not.toBeInTheDocument();
    });
  });

  it("入力をしないで登録を押すとエラーが表示される", async () => {
    render(<App />);

    // 登録ボタンを取得してクリック
    const addButton = screen.getByText("登録");
    fireEvent.click(addButton);

    // エラーが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText(/エラー:/)).toBeInTheDocument();
    });
  });
});