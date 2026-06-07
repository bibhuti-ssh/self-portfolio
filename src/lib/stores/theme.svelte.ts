export type Theme = 'light' | 'dark';

class ThemeState {
	current: Theme = $state('dark');

	toggle() {
		this.current = this.current === 'light' ? 'dark' : 'light';
		this.persist();
		this.applyAttribute();
	}

	set(theme: Theme) {
		this.current = theme;
		this.persist();
		this.applyAttribute();
	}

	get isDark() {
		return this.current === 'dark';
	}

	init() {
		if (typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem('theme') as Theme | null;
			if (stored === 'light' || stored === 'dark') {
				this.current = stored;
			}
		}
		this.applyAttribute();
	}

	private persist() {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('theme', this.current);
		}
	}

	private applyAttribute() {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', this.current);
		}
	}
}

export const theme = new ThemeState();
