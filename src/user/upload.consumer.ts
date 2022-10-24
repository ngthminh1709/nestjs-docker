import {OnQueueActive, OnQueueCompleted, OnQueueProgress, Process, Processor} from '@nestjs/bull';
import {Job} from 'bull'
import {BaseModel, InjectModel} from "@iaminfinity/express-cassandra";
import {UserEntity} from "./entities/user.entity";

@Processor('image-queue')
export class ImageConsumer {
    constructor(
        @InjectModel(UserEntity)
        private readonly userModel: BaseModel<UserEntity>
    ) {
    }
    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @OnQueueCompleted()
    onQueueProgress(job: Job, result: any) {
        console.log(
            `Job ${job.id} is completed`,
        );
    }

    @Process('upload-image-job')
    async uploadImageJob(job: Job) {

        await console.log('Uploaded')
        return {
            success: true,
        }
    }


}