export type ViewMode = 'human' | 'agent';

class ModeState {
	current: ViewMode = $state('human');

	toggle() {
		this.current = this.current === 'human' ? 'agent' : 'human';
		this.persist();
		this.applyAttribute();
	}

	set(mode: ViewMode) {
		this.current = mode;
		this.persist();
		this.applyAttribute();
	}

	get isAgent() {
		return this.current === 'agent';
	}

	get isHuman() {
		return this.current === 'human';
	}

	init() {
		if (typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem('view-mode') as ViewMode | null;
			if (stored === 'human' || stored === 'agent') {
				this.current = stored;
			}
		}
		this.applyAttribute();
	}

	private persist() {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('view-mode', this.current);
		}
	}

	private applyAttribute() {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-mode', this.current);
		}
	}
}

export const mode = new ModeState();
