import Component from "@/components/searchForm";
import { mountFunction, mountFunctionWithRouter } from "../utils/mountFunction";

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe("data", () => {
  it("searchWordがバインドされる", () => {
    wrapper = mountFunction(Component, {});
    expect(wrapper.vm.searchWord).toEqual("");
    wrapper.setData({ searchWord: "search test" });
    expect(wrapper.vm.searchWord).toEqual("search test");
  });
});

describe("event", () => {
  it("clearアイコンでsearchWordをクリアする", () => {
    wrapper = mountFunction(Component, {}, false);
    wrapper.setData({ searchWord: "search test" });
    expect(wrapper.vm.searchWord).toEqual("search test");
    wrapper.find("#search-form .term-clear").trigger("click");
    expect(wrapper.vm.searchWord).toEqual("");
  });
  it("検索ボタンでイベントをemitする", () => {
    //setup
    wrapper = mountFunction(Component, {}, false);
    const event = jest.fn();
    wrapper.vm.$on("search", event);
    //when
    wrapper.setData({ searchWord: "search test" });
    expect(event).toHaveBeenCalledTimes(0);
    wrapper.find("#search-form #search-btn").trigger("click");
    //then
    expect(event).toHaveBeenCalledWith("search test");
  });
});
