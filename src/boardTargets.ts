export interface Score {
  score: number;
  multiplyer: number;
}

const targets: Score[] = [...Array(20)].flatMap((_, row) =>
  [...Array(3)].map((_, column) => ({
    score: row + 1,
    multiplyer: column + 1,
  }))
);
targets.push({ score: 25, multiplyer: 1 });
targets.push({ score: 50, multiplyer: 1 });

const lastCheckOuts = targets.filter(
  (target) => target.multiplyer === 2 || target.score === 50
);

export function possibleCheckOuts(
  points: number,
  darts: number
): Score[][] | undefined {
  if (darts <= 0 || darts * 60 < points) {
    return;
  }

  return targets.reduce((prev, target) => {
    if (points - target.score * target.multiplyer < 0) {
      return prev;
    }

    const checkOuts = possibleCheckOuts(
      points - target.score * target.multiplyer,
      darts - 1
    );

    if (checkOuts) {
      if (!prev) {
        prev = [];
      }

      checkOuts.forEach((checkOut) => checkOut.unshift(target));
      prev = prev.concat(checkOuts);
    }

    const hits = lastCheckOuts.find(
      (checkout) =>
        checkout.score === target.score &&
        checkout.multiplyer === target.multiplyer
    );
    if (hits && hits.score * hits.multiplyer === points) {
      if (!prev) {
        prev = [];
      }

      prev = prev.concat([[hits]]);
    }

    return prev;
  }, undefined as Score[][] | undefined);
}

export default targets;
