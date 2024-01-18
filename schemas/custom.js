import { LocalSchema } from "~auth/runtime";

export default class PaytmSchema extends LocalSchema {
  async fetchUser(endpoint) {
    if (!this.check().valid) {
      return;
    }

    if (!this.options.endpoints.user) {
      this.$auth.setUser({});
      return;
    }

    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((res) => {
        const user = res.data.customer;
        this.$auth.setUser(user);
        return res;
      })
      .catch((e) => {
        this.$auth.callOnerror(e, { method: "fetchUser" });
      });
  }
}
