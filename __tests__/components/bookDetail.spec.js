import Component from "@/components/bookDetail";
import Book from "@/components/book";
import { mountFunction } from "../utils/mountFunction";

let wrapper;

let propsData;

afterEach(() => {
  wrapper.destroy();
});

beforeEach(() => {
  const el = document.createElement("div");
  el.setAttribute("data-app", true);
  document.body.appendChild(el);
  propsData = {
    book: {
      title: "test-title",
      url: "test-url",
      authors: "test-author",
      publishedDate: "test-publishedDate",
      pageCount: "test-pageCount",
      description: "test-description",
      id: "test-id",
      user: "test-user",
      comment: "test-comment",
      completed: false
    }
  };
});

describe("props", () => {
  it("bookオブジェクトがバインドされる", () => {
    //setup
    wrapper = mountFunction(Component, { propsData });
    //then
    expect(wrapper.vm.book).toEqual(propsData.book);
    const bookWrapper = wrapper.find(Book);
    expect(bookWrapper.is(Book)).toBe(true);
    expect(bookWrapper.vm.book).toEqual(propsData.book);
  });
});

describe("data", () => {
  it("comment, completedがバインドされる", async () => {
    //setup
    wrapper = mountFunction(Component, { propsData }, false);
    await wrapper.setData({ dialog: true });
    expect(wrapper.vm.book.comment).toEqual(propsData.book.comment);
    expect(wrapper.vm.book.completed).toBe(propsData.book.completed);
    const comment = wrapper.find("[name='comment-textarea']");
    const val = "test value changed";
    const completed = wrapper.find("[name='completed-check']");
    //when
    comment.setValue(val);
    comment.trigger("input");
    //then
    expect(wrapper.vm.book.comment).toEqual(val);
    //when
    completed.setChecked();
    //then
    expect(wrapper.vm.book.completed).toBe(true);
  });
});

describe("dialog", () => {
  it("dialogがバインドされる", async () => {
    //setup
    const stubs = {
      stubs: Book
    };
    wrapper = mountFunction(Component, { propsData, stubs });
    //then
    wrapper.setData({ dialog: false });
    expect(wrapper.vm.dialog).toBe(false);
    wrapper.setData({ dialog: true });
    expect(wrapper.vm.dialog).toBe(true);
  });
});

describe("event", () => {
  let stubs;
  beforeEach(() => {
    stubs = {
      stubs: Book
    };
  });
  it("closeボタンクリックでフォームが閉じる", async () => {
    //setup
    wrapper = mountFunction(Component, { propsData, stubs }, false);
    await wrapper.setData({ dialog: true });
    expect(wrapper.vm.dialog).toBe(true);
    //then
    await wrapper.find("button[name='close-btn']").trigger("click");
    //when
    expect(wrapper.vm.dialog).toBe(false);
  });
  it("updateボタンクリックでイベントを発行する", async () => {
    //setup
    wrapper = mountFunction(Component, { propsData, stubs }, false);
    const event = jest.fn();
    wrapper.vm.$on("update", event);
    await wrapper.setData({ dialog: true });
    expect(wrapper.vm.dialog).toBe(true);
    //then
    await wrapper.find("button[name='update-btn']").trigger("click");
    //when
    expect(event).toHaveBeenCalledWith({
      id: propsData.book.id,
      uid: propsData.book.user,
      comment: propsData.book.comment,
      completed: propsData.book.completed
    });
    expect(wrapper.vm.dialog).toBe(false);
  });
  it("updateボタンクリックでイベントを発行する_commentが101文字", async () => {
    //setup
    wrapper = mountFunction(Component, { propsData, stubs }, false);
    const event = jest.fn();
    wrapper.vm.$on("update", event);
    await wrapper.setData({ dialog: true });
    expect(wrapper.vm.dialog).toBe(true);
    //then
    const comment = wrapper.find("[name='comment-textarea']");
    let val = "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901";
    comment.setValue(val);
    comment.trigger("input");
    expect(wrapper.vm.book.comment).toEqual(val);
    expect(wrapper.vm.$refs.book.validate()).toBe(false);
    await wrapper.find("button[name='update-btn']").trigger("click");
    //when
    expect(event).toHaveBeenCalledTimes(0);
    expect(wrapper.vm.dialog).toBe(true);
    val = "";
    comment.setValue(val);
    comment.trigger("input");
    expect(wrapper.vm.book.comment).toEqual(val);
    expect(wrapper.vm.$refs.book.validate()).toBe(true);
    await wrapper.find("button[name='update-btn']").trigger("click");
    //when
    expect(event).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.dialog).toBe(false);
  });
});
