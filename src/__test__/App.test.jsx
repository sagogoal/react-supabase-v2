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

    await waitFor(() => {
      expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument();
    }, { timeout: 5000 });

    const titleInput = screen.getByPlaceholderText("学習内容を入力");
    const timeInput = screen.getByPlaceholderText("学習時間を入力");
    const addButton = screen.getByText("登録");

    const timestamp = new Date().getTime();
    const testTitle = `テスト${timestamp}`;

    fireEvent.change(titleInput, { target: { value: testTitle } });
    fireEvent.change(timeInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    await waitFor(
      () => {
        expect(screen.getByText(testTitle)).toBeInTheDocument();
      },
      {
        timeout: 15000,
        interval: 1000,
      }
    );
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

  it("削除ボタンを押すと学習記録が削除される", async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument();
      });

      const rows = screen.getAllByRole('row');
      const targetRow = rows[1];
      const targetText = targetRow.cells[0].textContent;

      // Using the data-testid to find the delete button
      const deleteButtons = screen.getAllByTestId('delete-button');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.queryByText(targetText)).not.toBeInTheDocument();
      }, { timeout: 5000 });
  });
});