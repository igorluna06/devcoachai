import { validateTitle } from "../../utils/validators/titleValidator";
import { validateUrl } from "../../utils/validators/urlValidator";

export class Certificate {

    private certificateId: number | undefined;
    private title: string;
    private issuedAt: Date;
    private shareableUrl: string | null;
    private userId: number;
    private studyPlanId: number;

    private constructor(
        title: string,
        userId: number,
        studyPlanId: number,
        issuedAt?: Date,
        shareableUrl?: string | null,
        certificateId?: number
    ) {
        this.title = title;
        this.userId = userId;
        this.studyPlanId = studyPlanId;
        this.issuedAt = issuedAt ?? new Date();
        this.shareableUrl = shareableUrl ?? null;
        this.certificateId = certificateId;
    }

    static create(title: string, userId: number, studyPlanId: number): Certificate {
        validateTitle(title);
        return new Certificate(title, userId, studyPlanId);
    }

    static restore(
        certificateId: number,
        title: string,
        userId: number,
        studyPlanId: number,
        issuedAt: Date,
        shareableUrl: string | null
    ): Certificate {
        return new Certificate(title, userId, studyPlanId, issuedAt, shareableUrl, certificateId);
    }

    getCertificateId(): number | undefined { return this.certificateId; }
    getTitle(): string { return this.title; }
    getIssuedAt(): Date { return this.issuedAt; }
    getShareableUrl(): string | null { return this.shareableUrl; }
    getUserId(): number { return this.userId; }
    getStudyPlanId(): number { return this.studyPlanId; }

    setShareableUrl(url: string): void {
        validateUrl(url);
        this.shareableUrl = url;
    }
}