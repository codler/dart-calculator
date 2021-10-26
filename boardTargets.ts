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

const cachePossibleCheckOuts: {
  [key: number]: { [key: number]: Score[][] | undefined };
} = {};
export function possibleCheckOuts(
  points: number,
  darts: number
): Score[][] | undefined {
  if (!cachePossibleCheckOuts[darts]) {
    cachePossibleCheckOuts[darts] = {};
  }
  if (cachePossibleCheckOuts[darts].hasOwnProperty(points)) {
    return cachePossibleCheckOuts[darts][points];
  }

  if (darts <= 0 || darts * 60 < points) {
    return;
  }

  const result = targets.reduce((prev, target) => {
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

      prev = prev.concat(
        checkOuts.map((checkOut) => {
          const newCheckout = [...checkOut];
          newCheckout.unshift(target);
          return newCheckout;
        })
      );
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

  cachePossibleCheckOuts[darts][points] = result;
  return result;
}

export default targets;
