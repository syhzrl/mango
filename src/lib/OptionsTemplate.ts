import { ISurveyQuestionOption, ISurveyQuestionSlidingOption } from 'entities/question';
import { nanoid } from 'nanoid';

export const StandardQuestionOptions: ISurveyQuestionOption[] = [{
    id: nanoid(8),
    valueEn: 'Option 1 En',
    valueMs: 'Option 1 Ms',
    valueZh: 'Option 1 Zh',
},
{
    id: nanoid(8),
    valueEn: 'Option 2 En',
    valueMs: 'Option 2 Ms',
    valueZh: 'Option 2 Zh',
},
{
    id: nanoid(8),
    valueEn: 'Option 3 En',
    valueMs: 'Option 3 Ms',
    valueZh: 'Option 3 Zh',
}];

export const SlidingThreeOptions: ISurveyQuestionSlidingOption[] = [{
    id: nanoid(8),
    key: 1,
    valueEn: 'Option 1 En',
    valueMs: 'Option 1 Ms',
    valueZh: 'Option 1 Zh',
},
{
    id: nanoid(8),
    key: 2,
    valueEn: 'Option 2 En',
    valueMs: 'Option 2 Ms',
    valueZh: 'Option 2 Zh',
},
{
    id: nanoid(8),
    key: 3,
    valueEn: 'Option 3 En',
    valueMs: 'Option 3 Ms',
    valueZh: 'Option 3 Zh',
}];

export const SlidingTenOptions: ISurveyQuestionSlidingOption[] = [{
    id: nanoid(8),
    key: 1,
    valueEn: '1',
    valueMs: '1',
    valueZh: '1',
},
{
    id: nanoid(8),
    key: 2,
    valueEn: '2',
    valueMs: '2',
    valueZh: '2',
},
{
    id: nanoid(8),
    key: 3,
    valueEn: '3',
    valueMs: '3',
    valueZh: '3',
},
{
    id: nanoid(8),
    key: 4,
    valueEn: '4',
    valueMs: '4',
    valueZh: '4',
},
{
    id: nanoid(8),
    key: 5,
    valueEn: '5',
    valueMs: '5',
    valueZh: '5',
},
{
    id: nanoid(8),
    key: 6,
    valueEn: '6',
    valueMs: '6',
    valueZh: '6',
},
{
    id: nanoid(8),
    key: 7,
    valueEn: '7',
    valueMs: '7',
    valueZh: '7',
},
{
    id: nanoid(8),
    key: 8,
    valueEn: '8',
    valueMs: '8',
    valueZh: '8',
},
{
    id: nanoid(8),
    key: 9,
    valueEn: '9',
    valueMs: '9',
    valueZh: '9',
},
{
    id: nanoid(8),
    key: 10,
    valueEn: '10',
    valueMs: '10',
    valueZh: '10',
}];

export const createOtherTemplate = {
    id: nanoid(8),
    valueEn: 'Other',
    valueMs: 'Other',
    valueZh: 'Other',
};

export const RewardCopyOptions = [{
    id: nanoid(8),
    valueEn: 'Yes',
    valueMs: 'Yes',
    valueZh: 'Yes',
}, {
    id: nanoid(8),
    valueEn: 'No',
    valueMs: 'No',
    valueZh: 'No',
}];
