export const Visualizer = (analysis) => {
  console.log('visualizer', analysis);
  let duration = analysis.duration;
  let segments = analysis.segments.map((segment) => {
    return {
      start: segment.start / duration,
      duration: segment.duration / duration,
      loudness: 1 - Math.min(Math.max(segment.loudness_max, -35), 0) / -35,
    };
  });
  let min = Math.min(...segments.map((s) => s.loudness));
  let max = Math.max(...segments.map((s) => s.loudness));
  let levels = [];

  for (let i = 0.0; i < 1; i += 0.001) {
    let s = segments.find((segment) => {
      return i <= segment.start + segment.duration;
    });

    let loudness = Math.round((s.loudness / max) * 100) / 100;

    levels.push(loudness);
  }
  //console.log('levels', levels);
  return levels;
};
