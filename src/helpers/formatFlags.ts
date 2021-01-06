/* eslint-disable no-nested-ternary */
export const formatPlural = (times: number, verb: string) => (times === 0
  ? `wasn't ${verb}`
  : times === 1
    ? `was ${verb} once`
    : times === 2 ? `was ${verb} twice` : `was ${verb} more than twice`);
