import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";


const mountFunction = (component, options, isShallow) => {
  return mountFunctionImpl(component, options, isShallow, createLocalVue());
};

const mountFunctionImpl = (component, options, isShallow = true, localVue) => {
  const vuetify = new Vuetify();
  if (isShallow) {
    return shallowMount(component, {
      localVue,
      vuetify,
      ...options
    });
  } else {
    return mount(component, {
      localVue,
      vuetify,
      ...options
    });
  }
};

const mountFunctionWithRouter = (component, argOptions, isShallow = true) => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();
  return mountFunctionImpl(component, {router, ...argOptions}, isShallow, localVue);
}

export { mountFunction, mountFunctionWithRouter, mountFunctionImpl };
