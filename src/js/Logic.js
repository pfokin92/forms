export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.hidePopover = this.hidePopover.bind(this);
    this.showPopover = this.showPopover.bind(this);
  }

  init() {
    this.gui.drawUi();
    this.gui.form.addEventListener('click', this.showPopover);
    this.gui.widget.addEventListener('click', this.hidePopover);
  }

  hidePopover(e) {
    e.preventDefault();
    if (e.target === this.gui.inputText || e.target === this.gui.button) return;
    this.gui.popover.classList.add('hidden');
  }

  showPopover(e) {
    e.preventDefault();
    const position = e.target.getBoundingClientRect();
    this.gui.popover.classList.remove('hidden');
    const width = e.target.offsetWidth;
    if (e.target === this.gui.inputText) {
      this.gui.popoverTitle.innerHTML = 'Input';
      this.gui.popover.style.left = `${(position.left + width / 2 - 250 / 2).toFixed()}px`;
      this.gui.popover.style.top = `${(position.top - this.gui.popover.offsetHeight - 5).toFixed()}px`;
    }
    if (e.target === this.gui.button) {
      this.gui.popoverTitle.innerHTML = 'Button';
      this.gui.popover.style.left = `${(position.left + width / 2 - 250 / 2).toFixed()}px`;
      this.gui.popover.style.top = `${(position.top - this.gui.popover.offsetHeight - 5).toFixed()}px`;
    }
  }
}
