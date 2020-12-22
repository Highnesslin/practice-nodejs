function createRule(handler) {
  return {
    next: null,
    handle() {
      const ans = handler();
      if (ans) {
        if (!this.next) {
          return ans;
        } else {
          return this.next.handle();
        }
      }
      return false;
    },
    setNext(rule) {
      this.next = rule;
    },
  };
}
