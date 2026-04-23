import { checkWaterQuality } from "../utils/waterQualityChecker.js";
import { getPrecautions } from "../utils/getPrecautions.js";

const manualQuality = async (req, res) => {
  const { ph, bod, do: DO, tc, usage } = req.body;

  if (
    ph == null ||
    bod == null ||
    DO == null ||
    tc == null ||
    !usage
  ) {
    return res.status(400).json({
      error: "All parameters and usage are required",
    });
  }

  const params = {
    pH: Number(ph),
    BOD: Number(bod),
    DO: Number(DO),
    TC: Number(tc),
  };

  const result = checkWaterQuality(params);
  const classResult = result.classes[usage];

  let precautions = null;
  try {
    precautions = await getPrecautions(usage, classResult);
  } catch (err) {
    console.error(err);
  }

  return res.json({
    selectedClass: usage,
    label: classResult.label,
    pass: classResult.pass,
    failures: classResult.failures || [],
    precautions: precautions || null,
    bestClass: result.bestClass,
    allClasses: result.classes,
  });
};

export default manualQuality;