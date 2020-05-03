import Component from "@/components/bookDetail";
import App from "@/App";
import Book from "@/components/book";
import { mountFunction } from "../utils/mountFunction";

let wrapper;

let propsData;

afterEach(() => {
  wrapper.destroy();
});

beforeEach(() => {
  propsData = {
    book: {
      title: "test-title",
      url: "test-url",
      authors: "test-author",
      publishedDate: "test-publishedDate",
      pageCount: "test-pageCount",
      description: "test-description"
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

describe("dialog", () => {
  const el = document.createElement('div')
  el.setAttribute('data-app', true)
  document.body.appendChild(el)
  it("dialogがバインドされる", async () => {
    //setup
    const stubs = {
      stubs: Book
    };
    wrapper = mountFunction(Component, { propsData, stubs });
    //then
    console.log(wrapper.html());
    wrapper.setData({ dialog: false });
    expect(wrapper.vm.dialog).toBe(false);
    wrapper.setData({ dialog: true });
    expect(wrapper.vm.dialog).toBe(true);
  });
});
