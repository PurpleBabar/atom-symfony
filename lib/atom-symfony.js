'use babel';

import AtomSymfonyView from './atom-symfony-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSymfonyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSymfonyView = new AtomSymfonyView(state.atomSymfonyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSymfonyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-symfony:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSymfonyView.destroy();
  },

  serialize() {
    return {
      atomSymfonyViewState: this.atomSymfonyView.serialize()
    };
  },

  toggle() {
    console.log('AtomSymfony was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
