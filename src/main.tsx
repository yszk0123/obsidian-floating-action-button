import {
  App,
  debounce,
  MarkdownView,
  Plugin,
  PluginSettingTab,
  Setting,
} from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom';

import { PLUGIN_ID, PLUGIN_NAME, ROOT_ELEMENT_ID } from './constants';
import { App as AppContaier } from './containers/App';
import { MAX_MARGIN, MIN_MARGIN, parseMargin } from './models/Margin';
import { Mode, toggleMode } from './models/Mode';
import { parsePosition, Position } from './models/Position';

const DEBOUNCE = 200;

interface FabPluginSettings {
  margin: number;
  position: Position;
}

const DEFAULT_SETTINGS: FabPluginSettings = {
  margin: 32,
  position: 'bottomRight',
};

export default class FabPlugin extends Plugin {
  settings!: FabPluginSettings;

  async onload(): Promise<void> {
    console.log(`loading ${PLUGIN_ID} plugin`);

    await this.loadSettings();

    this.addSettingTab(new FabSettingTab(this.app, this));

    this.app.workspace.onLayoutReady(() => {
      this.render();
    });

    this.app.workspace.on('active-leaf-change', () => {
      this.render();
    });

    this.app.workspace.on(
      'layout-change',
      debounce(() => {
        this.render();
      }, DEBOUNCE)
    );
  }

  onunload(): void {
    console.log(`unloading ${PLUGIN_ID} plugin`);
    this.cleanup();
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  private render(mode = this.getActiveViewMode()): void {
    const root = this.getOrCreateRootElement();
    ReactDOM.render(
      <AppContaier
        margin={this.settings.margin}
        mode={mode}
        position={this.settings.position}
        onClick={this.handleClick}
      />,
      root
    );
  }

  private cleanup(): void {
    this.removeRootElement();
  }

  private handleClick = () => {
    this.toggleMode();
  };

  private toggleMode(): void {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (view === null) {
      return;
    }

    const viewState = view.leaf.getViewState();
    const mode = view.getMode();

    const newMode = toggleMode(mode);
    const newViewState = {
      ...viewState,
      state: {
        ...viewState.state,
        mode: newMode,
      },
    };

    view.leaf.setViewState(newViewState);
  }

  private getActiveViewMode(): Mode | null {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    return view?.getMode() ?? null;
  }

  private getOrCreateRootElement(): HTMLElement {
    const root = document.getElementById(ROOT_ELEMENT_ID);
    if (root !== null) {
      return root;
    }

    const newRoot = document.createElement('div');
    newRoot.id = ROOT_ELEMENT_ID;
    document.body.appendChild(newRoot);
    return newRoot;
  }

  private removeRootElement(): void {
    const root = document.getElementById(ROOT_ELEMENT_ID);
    root?.empty();
  }
}

class FabSettingTab extends PluginSettingTab {
  plugin: FabPlugin;

  constructor(app: App, plugin: FabPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: `${PLUGIN_NAME} Settings` });

    new Setting(containerEl).setName('Margin').addSlider((slider) =>
      slider
        .setLimits(MIN_MARGIN, MAX_MARGIN, 'any')
        .onChange(async (value) => {
          this.plugin.settings.margin = parseMargin(value);
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName('Position').addDropdown((dropdown) => {
      dropdown
        .addOptions({ bottomLeft: 'Bottom Left', bottomRight: 'Bottom Right' })
        .onChange(async (value) => {
          this.plugin.settings.position = parsePosition(value);
          await this.plugin.saveSettings();
        });
    });
  }
}
