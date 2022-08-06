import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { Card } from 'reactstrap';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

import Button from 'components/Button';
import Text from 'components/Text';
import Icons from 'assets/icons';
import { Oval } from 'react-loader-spinner';

import NavActions from 'lib/NavActions';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import Selectors from 'redux/Selectors';
import { IGetSurveyResponsesParams, ISurveyResponses } from 'redux/slices/reports/types';
import { ISurveyQuestionTypeEnum } from 'entities/question';
import Actions from 'redux/Actions';

import { ContainerStyles as CampaignStyles, ItemStyles as CampaignItemStyles } from 'containers/campaigns/styles/CampaignScreenStyles';
import { ItemStyles } from 'containers/qr/styles/EditQrStyles';
import RewardsStyles from '../rewards/styles';
import Styles from './styles';

interface SurveyResponsesProps {
    gettingSurveyResponses: boolean;
    getSurveyResponsesError: string;
    surveyResponses: ISurveyResponses;
    getSurveyResponses: (params: IGetSurveyResponsesParams) => void;
}

const SurveyResponses = (props: SurveyResponsesProps): JSX.Element => {
    const {
        gettingSurveyResponses,
        getSurveyResponsesError,
        surveyResponses,
        getSurveyResponses,
    } = props;

    const params = useParams();
    const { surveyId = '', surveyName = '' } = params;
    const colors = ['#021778', '#08584A', '#991499', '#A167CB', '#0074C0', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#8884d8'];

    useEffect(() => {
        if (surveyId) {
            getSurveyResponses({ surveyId });
        }
    }, [surveyId]);

    // Dropdown = 1, horizontal bar chart
    // SelectMultiple = 2, vertical bar chart
    // SelectOne = 3, pie chart
    // SlidingThree = 4, pie chart
    // SlidingTen = 5, horizontal bar chart

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text style={{ fontSize: '14px' }} x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='auto'>
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        );
    };

    if (gettingSurveyResponses) {
        return (
            <div style={CampaignStyles.spinnerContainer}>
                <Oval
                    height={200}
                    width={200}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            </div>
        );
    }

    if (getSurveyResponsesError) {
        return (
            <div style={CampaignStyles.spinnerContainer}>
                <Text style={{ color: 'red', marginBottom: '20px' }}>{getSurveyResponsesError}</Text>
                <Button
                    onClick={() => getSurveyResponses({ surveyId })}
                    css={CampaignItemStyles.retryButton}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: '0px 20px 40px',
                backgroundColor: '#F6F6F6',
                width: '1380px',
                boxSizing: 'border-box',
            }}
        >
            <Button
                onClick={() => NavActions.navBack()}
                css={ItemStyles.backButton}
            >
                <SVG src={Icons.ChevronLeft} id='backIcon' />
                <Text style={{ marginLeft: '5px' }}>BACK</Text>
            </Button>

            <div style={{ borderTop: '0.5px solid rgb(0,0,0,0.1)' }} />

            <div style={Styles.SurveyResponsesHeaderContainer}>
                <Text
                    style={{
                        fontSize: '38px',
                        fontWeight: 'bold',
                    }}
                >
                    {surveyName}
                </Text>

                <Button
                    style={RewardsStyles.UploadCSVButton}
                    onClick={() => NavActions.navToSurveyResponses({ surveyId, surveyName })}
                >
                    EXPORT REPORT (.CSV)
                </Button>
            </div>

            <Card
                style={{
                    padding: '20px 30px',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    width: 'auto',
                    border: 0,
                }}
            >
                {surveyResponses.responses}
                {' '}
                Responses
            </Card>

            {surveyResponses.questions.map(question => {
                if (question.type === ISurveyQuestionTypeEnum.Dropdown || question.type === ISurveyQuestionTypeEnum.SlidingTen) {
                    return (
                        <Card style={Styles.SurveyResponsesChartCards}>
                            <div style={Styles.SurveyResponseChartCardTitle}>
                                {question.questionName}
                            </div>

                            <div>
                                {question.responses || 0}
                                {' '}
                                Responses
                            </div>

                            <BarChart
                                width={1200}
                                height={400}
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                data={question.options.map(item => {
                                    return { name: item.name, value: item.responses };
                                })}
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        ...Styles.ChartTooltip,
                                    }}
                                    formatter={(value: number) => {
                                        return [value];
                                    }}
                                />
                                <Legend
                                    verticalAlign='top'
                                    height={36}
                                    formatter={() => {
                                        return ['responses'];
                                    }}
                                />
                                <Bar
                                    dataKey='value'
                                    fill='#0074C0'
                                    label={{ fill: 'white' }}
                                >
                                    {/* <LabelList dataKey='name' position='insideTop' /> */}
                                </Bar>
                            </BarChart>
                        </Card>
                    );
                } if (question.type === ISurveyQuestionTypeEnum.SelectMultiple) {
                    return (
                        <Card style={Styles.SurveyResponsesChartCards}>
                            <div style={Styles.SurveyResponseChartCardTitle}>
                                {question.questionName}
                            </div>

                            <div>
                                {question.responses || 0}
                                {' '}
                                Responses
                            </div>

                            <BarChart
                                width={1200}
                                height={400}
                                layout='vertical'
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                data={question.options.map(item => {
                                    return { name: item.name, value: item.responses };
                                })}
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis type='number' dataKey='value' />
                                <YAxis type='category' dataKey='name' />
                                <Tooltip
                                    contentStyle={{
                                        ...Styles.ChartTooltip,
                                    }}
                                    formatter={(value: number) => {
                                        return [value];
                                    }}
                                />
                                <Legend
                                    verticalAlign='top'
                                    height={36}
                                    formatter={() => {
                                        return ['responses'];
                                    }}
                                />
                                <Bar
                                    dataKey='value'
                                    fill='#0074C0'
                                    label={{ fill: 'white' }}
                                />
                            </BarChart>
                        </Card>
                    );
                } if (question.type === ISurveyQuestionTypeEnum.SelectOne || question.type === ISurveyQuestionTypeEnum.SlidingThree) {
                    return (
                        <Card style={Styles.SurveyResponsesChartCards}>
                            <div style={Styles.SurveyResponseChartCardTitle}>
                                {question.questionName}
                            </div>

                            <div>
                                {question.responses || 0}
                                {' '}
                                Responses
                            </div>

                            <PieChart
                                width={1200}
                                height={400}
                            >
                                <Pie
                                    data={question.options.map(item => {
                                        return { name: item.name, value: item.responses };
                                    })}
                                    dataKey='value'
                                    nameKey='name'
                                    label={renderCustomizedLabel}
                                    labelLine={false}
                                >
                                    {
                                        question.options.map((item, index) => (
                                            <Cell key={`cell-${item.name}`} fill={colors[index]} />
                                        ))
                                    }
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        ...Styles.ChartTooltip,
                                    }}
                                    formatter={(value: number, name: string) => {
                                        return [value, name];
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ marginTop: '30px' }}
                                    layout='vertical'
                                    align='left'
                                    verticalAlign='top'
                                    iconType='circle'
                                    height={36}
                                />
                            </PieChart>
                        </Card>
                    );
                }
                return (
                    <div>
                        Test
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    gettingSurveyResponses: Selectors.reportsGetSurveyResponsesAttempting(state),
    getSurveyResponsesError: Selectors.reportsGetSurveyResponsesError(state),
    surveyResponses: Selectors.reportsGetSurveyResponses(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getSurveyResponses: (params: IGetSurveyResponsesParams) => dispatch(Actions.reportsGetSurveyResponsesAttempt(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyResponses);
