import icons from 'carbon-icons';

export default {
  name: 'ca-icon',
  data: () => ({
    iconElement: null,
  }),
  props: {
    description: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
    viewBox: {
      type: String,
      default: '0 0 25 25',
    },
  },
  methods: {
    getIcon(name, iconsObj = icons) {
      const icon = iconsObj.filter(obj => obj.name === name);

      if (icon.length === 0) {
        return false;
      } else if (icon.length > 1) {
        throw new Error('[Carvue]: Multiple icons found');
      }
      const iconSvg = icon[0].svgData;

      return Object.keys(iconSvg).filter(key => iconSvg[key]).map((key) => {
        const data = iconSvg[key];
        if (key === 'circles') {
          return data.map((circle, index) => {
            const circleProps = {
              cx: circle.cx,
              cy: circle.cy,
              r: circle.r,
              key: `circle${index}`,
            };
            return <circle {...circleProps} />;
          });
        } else if (key === 'paths') {
          return data.map((path, index) => {
            const pathProps = {
              d: path.d,
              key: `key${index}`,
            };
            return <path d={pathProps.d} key={pathProps.key} />;
          });
        }
        return '';
      });
    },
  },
  render() {
    const svgContent = this.getIcon(this.iconName);

    return (
      <svg class={this.className} width={this.width} height={this.height} viewBox={this.viewBox} fill-rule="evenodd">
        <title>{this.description}</title>
        {svgContent}
      </svg>
    );
  },
};
