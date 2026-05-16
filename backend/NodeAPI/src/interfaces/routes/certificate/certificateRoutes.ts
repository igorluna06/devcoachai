import { Router } from "express";
import { CertificateEndpoints } from "./certificateEndpoints";
import { certificateController } from "../../middlewares/certificate/CertificateFactory";

const router = Router();

router.post(CertificateEndpoints.ROOT, (req, res, next) => certificateController.createCertificate(req, res, next));
router.get(CertificateEndpoints.ROOT, (req, res, next) => certificateController.getAllCertificates(req, res, next));
router.get(CertificateEndpoints.BY_ID, (req, res, next) => certificateController.getCertificateById(req, res, next));
router.get(CertificateEndpoints.BY_USER_ID, (req, res, next) => certificateController.getCertificatesByUserId(req, res, next));
router.get(CertificateEndpoints.BY_STUDY_PLAN_ID, (req, res, next) => certificateController.getCertificatesByStudyPlanId(req, res, next));
router.put(CertificateEndpoints.ROOT, (req, res, next) => certificateController.updateCertificate(req, res, next));
router.delete(CertificateEndpoints.BY_ID, (req, res, next) => certificateController.deleteCertificate(req, res, next));

export default router;