/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'weekendometer-extension';

const { GObject, St } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Weekendometer'));

        let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
        box.add_child(new St.Icon({style_class: this._getClassName()}));
        this.add_child(box);
    }

    _getClassName() {
        let now = new Date();
		let d = now.getDay();
		let h = now.getHours();
        let icon = '';

		if( d == 1 && h < 12 ){
            icon = '0';
        }

		if( d == 1 && h >= 12 ){
            icon = '0';
        }

		if( d == 2 && h < 12 ){
            icon = '1';
        }

		if( d == 2 && h >= 12 ){
            icon = '2';
        }

		if( d == 3 && h < 12 ){
            icon = '3';
        }

		if( d == 3 && h >= 12 ){
            icon = '4';
        }

		if( d == 4 && h < 12 ){
			icon = '5';
        }

		if( d == 4 && h >= 12 ){
            icon = '6';
        }

		if( d == 5 && h < 12 ){
            icon = '7';
        }

		if( d == 5 && h >= 12 ){
            icon = '8';
        }

		if( d == 6 && h < 12 ){
            icon = '4';
        }

        if( d == 6 && h >= 12 ){
            icon = '3';
        }

		if( d == 0 && h < 12 ){
            icon = '2';
        }

		if( d == 0 && h >= 12 ){
            icon = '1';
        }
        let classname = 'base wom-'+icon;
		return classname;    
    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
