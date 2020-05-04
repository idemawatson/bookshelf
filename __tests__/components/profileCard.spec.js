import Component from "@/components/profileCard";
import { mountFunction } from "../utils/mountFunction";

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe("props", () => {
  it("propsがバインドされる", () => {
    //setup
    const propsData = { title: "test-title", value: "test-value", fontSize: "normal" };
    wrapper = mountFunction(Component, { propsData });
    //then
    expect(wrapper.vm.title).toEqual(propsData.title);
    expect(wrapper.vm.value).toEqual(propsData.value);
    expect(wrapper.vm.fontSize).toEqual(propsData.fontSize);
    expect(wrapper.find(".prof-title").text()).toEqual(propsData.title);
    expect(wrapper.find(".prof-content").text()).toEqual(propsData.value);
    expect(wrapper.find(".prof-content").element.classList.contains(propsData.fontSize)).toBe(true);
  });
});

describe("slot", () => {
  it("slotしたテンプレートが表示される", () => {
    //setup
    const slots = {additional: "<div id='slot-additional-test'></div>"};
    wrapper = mountFunction(Component, { slots });
    //then
    expect(wrapper.find("div[id='slot-additional-test']").exists()).toBe(true);
  });
});
