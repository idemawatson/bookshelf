import Component from "@/components/book";
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
    expect(wrapper.vm.title).toEqual(propsData.title);
    expect(wrapper.vm.url).toEqual(propsData.url);
    expect(wrapper.vm.authors).toEqual(propsData.authors);
    expect(wrapper.vm.publishedDate).toEqual(propsData.publishedDate);
    expect(wrapper.vm.pageCount).toEqual(propsData.pageCount);
    expect(wrapper.vm.description).toEqual(propsData.description);
    expect(wrapper.find(".book-detail .book-title").html()).toMatch(new RegExp(propsData.title));
    expect(wrapper.find("#book-img").html()).toMatch(new RegExp(propsData.url));
    expect(wrapper.findAll(".book-detail .detail-caption").wrappers[0].html()).toMatch(new RegExp(propsData.title));
    expect(wrapper.findAll(".book-detail .detail-caption").wrappers[1].html()).toMatch(
      new RegExp(propsData.publishedDate)
    );
    expect(wrapper.findAll(".book-detail .detail-caption").wrappers[2].html()).toMatch(new RegExp(propsData.pageCount));
    expect(wrapper.find("#book-description").html()).toMatch(new RegExp(propsData.description));
  });
});

describe("slot", () => {
  it("slotしたテンプレートが表示される", () => {
    //setup
    const slots = {activator: "<div id='slot-activator-test'></div>"};
    wrapper = mountFunction(Component, { propsData, slots }, true);
    //then
    expect(wrapper.find("div[id='slot-activator-test']").exists()).toBe(true);
  });
});
