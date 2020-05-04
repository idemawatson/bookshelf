import Component from "@/components/notification";
import { mountFunction } from "../utils/mountFunction";

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe("data", () => {
  it("dataがバインドされる", async () => {
    //setup
    wrapper = mountFunction(Component, {}, false);
    //then
    await wrapper.setData({ show: false });
    //when
    expect(wrapper.vm.show).toBe(false);
    expect(wrapper.find(".note").exists()).toBe(false);
    //then
    await wrapper.setData({ show: true, text: "test", status: "success" });
    //when
    expect(wrapper.vm.show).toBe(true);
    expect(wrapper.vm.status).toBe("success");
    expect(wrapper.vm.text).toBe("test");
    const note = wrapper.find(".note");
    expect(note.isVisible()).toBe(true);
    expect(note.html()).toMatch(/success-bar/);
    expect(note.text()).toMatch(/test/);
  });
});

describe("methods", () => {
  jest.setTimeout(10000);
  const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
  it("success", async () => {
    wrapper = mountFunction(Component, {}, false);
    const message = "success-test";
    wrapper.vm.success(message);
    expect(wrapper.vm.status).toEqual("success");
    expect(wrapper.vm.text).toEqual(message);
    await sleep(6000);
    expect(wrapper.vm.show).toEqual(false);
    expect(wrapper.vm.status).toEqual("");
    expect(wrapper.vm.text).toEqual("");
    expect(wrapper.find(".note").exists()).toBe(false);
  });
  it("info", async () => {
    wrapper = mountFunction(Component, {}, false);
    const message = "info-test";
    wrapper.vm.info(message);
    expect(wrapper.vm.status).toEqual("info");
    expect(wrapper.vm.text).toEqual(message);
    await sleep(6000);
    expect(wrapper.vm.show).toEqual(false);
    expect(wrapper.vm.status).toEqual("");
    expect(wrapper.vm.text).toEqual("");
    expect(wrapper.find(".note").exists()).toBe(false);
  });
  it("error", async () => {
    wrapper = mountFunction(Component, {}, false);
    const message = "error-test";
    wrapper.vm.error(message);
    expect(wrapper.vm.status).toEqual("error");
    expect(wrapper.vm.text).toEqual(message);
    await sleep(6000);
    expect(wrapper.vm.show).toEqual(false);
    expect(wrapper.vm.status).toEqual("");
    expect(wrapper.vm.text).toEqual("");
    expect(wrapper.find(".note").exists()).toBe(false);
  });
});
