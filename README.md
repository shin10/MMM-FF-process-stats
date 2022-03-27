# MMM-FF-proces-stats

This [MagicMirror²](https://github.com/MichMich/MagicMirror) module, shows statistics from the electron process.

## Installation

Navigate into your MagicMirror's `modules` folder and clone:

```sh
git clone https://github.com/shin10/MMM-FF-process-stats
```

## Configuration

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
  {
    module: "MMM-FF-proces-stats",
    position: "bottom_right",
    config: {
      updateInterval: 10000,
      animationSpeed: 0
    }
  }
];
```

## Configuration options

The following properties can be configured:

| Option           | Default              | Expected        | Description                                                  |
| ---------------- | -------------------- | --------------- | ------------------------------------------------------------ |
| `updateInterval` | `10000` (10 seconds) | `null` or `int` | The delay before automatically switching to the next screen. |
| `animationSpeed` | `0` (no transition)  | `0` - `5000`    | Speed of the update animation. (Milliseconds)                |
