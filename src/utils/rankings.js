export const handleChangeRanking = ({
  data,
  index,
  row,
  item,
  oldData,
  form,
}) => {
  // change target ranking
  data.splice(index, 1, {
    ...item,
    ...row,
  });
  form.setFieldsValue({
    [`dataGeneral[${row?.number - 1}].ranking`]: "",
  });

  const isDuplicate = oldData.findIndex((itm) => {
    return (
      itm.ranking === row?.ranking &&
      itm.postAlignment === oldData[index]?.postAlignment
    );
  });
  const oldRanking = parseInt(
    oldData?.[index].ranking === " " ? 0 : oldData?.[index].ranking
  );
  const rankingParser = (rank) => (rank === " " ? 0 : rank);
  const rankingParserToValue = (rank) => (rank <= 0 ? " " : rank);
  const rankingParserToValueForm = (rank) => (rank <= 0 ? "" : rank);
  // reranking when there are any duplication
  if (isDuplicate >= 0) {
    if (oldRanking === 0) {
      const totalTargetSwap = oldData.filter(
        (itm) =>
          rankingParser(itm.ranking) >= row?.ranking &&
          itm.postAlignment === oldData[index]?.postAlignment
      );
      let ranking = row?.ranking;
      totalTargetSwap.map(() => {
        const indexRanking = oldData.findIndex((itm) => {
          return (
            rankingParser(itm.ranking) === ranking &&
            itm.postAlignment === oldData[index]?.postAlignment
          );
        });
        const dataTarget = oldData.find((itm) => {
          return (
            rankingParser(itm.ranking) === ranking &&
            itm.postAlignment === oldData[index]?.postAlignment
          );
        });
        if (indexRanking >= 0) {
          data.splice(indexRanking, 1, {
            ...data[indexRanking],
            ranking: rankingParserToValue(ranking + 1),
          });
          form.setFieldsValue({
            [`dataGeneral[${dataTarget?.number - 1}].ranking`]:
              rankingParserToValueForm(ranking + 1),
          });
        }
        ranking++
      });
    } else if (oldRanking < row?.ranking) {
      for (let ranking = oldRanking; ranking < row.ranking; ranking++) {
        const theRank = ranking + 1;
        const indexRanking = oldData.findIndex(
          (itm) =>
            rankingParser(itm.ranking) === theRank &&
            itm.postAlignment === oldData[index]?.postAlignment
        );
        const dataTarget = oldData.find((itm) => {
          return (
            rankingParser(itm.ranking) === theRank &&
            itm.postAlignment === oldData[index]?.postAlignment
          );
        });
        if (indexRanking >= 0) {
          data.splice(indexRanking, 1, {
            ...data[indexRanking],
            ranking: rankingParserToValue(theRank - 1),
          });
          form.setFieldsValue({
            [`dataGeneral[${dataTarget?.number - 1}].ranking`]:
              rankingParserToValueForm(theRank - 1),
          });
        }
      }
    } else {
      for (let ranking = row.ranking; ranking < oldRanking; ranking++) {
        const indexRanking = oldData.findIndex((itm) => {
          return (
            rankingParser(itm.ranking) === ranking &&
            itm.postAlignment === oldData[index]?.postAlignment
          );
        });
        const dataTarget = oldData.find((itm) => {
          return (
            rankingParser(itm.ranking) === ranking &&
            itm.postAlignment === oldData[index]?.postAlignment
          );
        });
        if (indexRanking >= 0) {
          data.splice(indexRanking, 1, {
            ...data[indexRanking],
            ranking: rankingParserToValue(ranking + 1),
          });
          form.setFieldsValue({
            [`dataGeneral[${dataTarget?.number - 1}].ranking`]:
              rankingParserToValueForm(ranking + 1),
          });
        }
      }
    }
  }
};

export const handleChangePostAlignment = ({
  data,
  index,
  row,
  item,
  oldData,
  form,
}) => {
  // change target post alignment data and make his ranking empty
  data.splice(index, 1, {
    ...item,
    ...row,
    ranking: " ",
  });
  form.setFieldsValue({
    [`dataGeneral[${row?.number - 1}].ranking`]: "",
  });

  const oldRanking = parseInt(
    oldData?.[index].ranking === " " ? 0 : oldData?.[index].ranking
  );
  // reranking when target not empty
  if (oldRanking > 0) {
    for (let ranking = oldRanking; ranking < data.length; ranking++) {
      const theRank = ranking + 1;
      const indexRanking = oldData.findIndex(
        (itm) =>
          itm.ranking === theRank &&
          itm.postAlignment === oldData[index]?.postAlignment
      );
      const dataTarget = oldData.find((itm) => {
        return (
          itm.ranking === theRank &&
          itm.postAlignment === oldData[index]?.postAlignment
        );
      });
      if (indexRanking >= 0) {
        data.splice(indexRanking, 1, {
          ...data[indexRanking],
          ranking: theRank - 1,
        });
        form.setFieldsValue({
          [`dataGeneral[${dataTarget?.number - 1}].ranking`]: theRank - 1,
        });
      }
    }
  }
};
