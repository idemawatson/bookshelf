import Component from "@/components/header";
import { mountFunction, mountFunctionWithRouter } from "../utils/mountFunction";


let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe("サインアウト", () => {
  it("アイコンクリックでサインアウトが実行される", () => {
    wrapper = mountFunction(Component, {}, false);
    const icon = wrapper.find("button[name='logout']");
    icon.trigger("click");
  });
});

describe("drawerを開く", () => {
  it("アイコンクリックでイベントをemitする", () => {
    wrapper = mountFunction(Component, {}, false);
    const event = jest.fn();
    wrapper.vm.$on("openNav", event);
    expect(event).toHaveBeenCalledTimes(0);
    wrapper.find("button[name='nav-icon']").trigger("click");
    expect(event).toHaveBeenCalledTimes(1);
  });
});

