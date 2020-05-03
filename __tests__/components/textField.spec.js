import Component from "@/components/textField";
import { mountFunction, mountFunctionWithRouter } from "../utils/mountFunction";

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe("props", () => {
  it("受け渡したpropsを表示する", () => {
    const propsData = {
      label: "テキスト",
      value: "値",
      rules: [v => !!v || "aaa"],
      counter: "8"
    };
    wrapper = mountFunction(Component, { propsData });
    expect(wrapper.vm.label).toEqual(propsData.label);
    expect(wrapper.vm.value).toEqual(propsData.value);
    expect(wrapper.vm.rules).toEqual(propsData.rules);
    expect(wrapper.vm.counter).toEqual(propsData.counter);
    const selector =
      "v-text-field-stub[label='" +
      propsData.label +
      "'][id='" +
      propsData.label +
      "'][value='" +
      propsData.value +
      "'][counter='" +
      propsData.counter +
      "']";
    expect(wrapper.find(selector).exists()).toBe(true);
  });
});

describe("emit", () => {
  it("入力時にイベントを発行する", () => {
    const propsData = {
      label: "test",
      value: "値",
      rules: [v => !!v || "aaa"],
      counter: "8"
    };
    wrapper = mountFunction(Component, { propsData }, false);
    const event = jest.fn();
    wrapper.vm.$on("input", event);
    const input = wrapper.find("input[id='test']");
    console.log(input.html());
    expect(event).toHaveBeenCalledTimes(0);
    input.trigger("input");
    expect(event).toHaveBeenCalledTimes(1);
  });
});
