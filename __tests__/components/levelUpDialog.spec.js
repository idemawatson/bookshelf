import Component from "@/components/levelUpDialog";
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
    beforeLevel: 1,
    level: 10
  };
});

describe("props", () => {
  it("propsがバインドされる", async () => {
    //setup
    wrapper = mountFunction(Component, { propsData }, false);
    //then
    await wrapper.setData({ dialog: true });
    expect(wrapper.vm.beforeLevel).toEqual(propsData.beforeLevel);
    expect(wrapper.vm.level).toEqual(propsData.level);
    const levels = wrapper.findAll(".level-info span").wrappers;
    expect(levels[0].html()).toMatch(new RegExp(propsData.beforeLevel));
    expect(levels[2].html()).toMatch(new RegExp(propsData.level));
  });
});

describe("methods", () => {
  it("open&close", async () => {
    wrapper = mountFunction(Component, { propsData }, false);
    await wrapper.vm.open();
    expect(wrapper.vm.dialog).toBe(true);
    await wrapper.find("button[name='close-btn']").trigger("click");
    expect(wrapper.vm.dialog).toBe(false);
  });
});

