import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { Card } from 'reactstrap';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import { Oval } from 'react-loader-spinner';
import Text from 'components/Text';

import NavActions from 'lib/NavActions';
import { AppDispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { IGetSurveyReportsParams, ISurveyReports } from 'redux/slices/reports/types';

import { ContainerStyles as CampaignStyles, ItemStyles as CampaignItemStyles } from 'containers/campaigns/styles/CampaignScreenStyles';
import RewardsStyles from '../rewards/styles';
import Styles from './styles';

interface SurveyReportsProps {
    gettingSurveyReports: boolean;
    getSurveyReportsError: string;
    surveyReports: ISurveyReports;
    reportsStartDate: string | null;
    reportsEndDate: string | null;
    getSurveyReports: (params: IGetSurveyReportsParams) => void;
}

const SurveyReports = (props: SurveyReportsProps): JSX.Element => {
    const {
        gettingSurveyReports,
        getSurveyReportsError,
        surveyReports,
        reportsStartDate,
        reportsEndDate,
        getSurveyReports,
    } = props;

    const params = useParams();
    const { surveyId = '', surveyName = '' } = params;

    const [localStartDate, setLocalStartDate] = useState<string | null>();
    const [localEndDate, setLocalEndDate] = useState<string | null>();

    useEffect(() => {
        if (reportsStartDate && reportsEndDate) {
            setLocalStartDate(reportsStartDate);
            setLocalEndDate(reportsEndDate);
        }
    }, []);

    useEffect(() => {
        if (surveyId && localStartDate && localEndDate) {
            getSurveyReports({ surveyId, dateFrom: localStartDate, dateTo: localEndDate });
        }
    }, [surveyId, localEndDate]);

    const onDatesChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;

        if (start) {
            setLocalStartDate(dayjs(start).format('YYYY-MM-DD'));
            setLocalEndDate(null);
        }

        if (end) setLocalEndDate(dayjs(end).format('YYYY-MM-DD'));
    };

    const renderCharts = () => {
        if (!surveyReports) return false;

        return (
            <div style={Styles.ChartContainer}>
                {surveyReports.averageTimeSpentChart.length !== 1 && surveyReports.averageTimeSpentChart[0].name !== '' && surveyReports.averageTimeSpentChart[0].value !== 0
                    ? (
                        <Card style={Styles.SurveyReportsChartCard}>
                            <div style={Styles.ChartCardTitleContainer}>
                                <div style={Styles.ChartCardTitle}>
                                    Average Time Spent
                                </div>

                                <div style={Styles.ChartCardDescription}>
                                    {dayjs(localStartDate).format('DD/MM')}
                                    -
                                    {dayjs(localEndDate).format('DD/MM')}
                                </div>
                            </div>

                            <LineChart
                                width={600}
                                height={300}
                                margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
                                data={surveyReports.averageTimeSpentChart}
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis unit='m' />
                                <Tooltip
                                    contentStyle={{
                                        ...Styles.ChartTooltip,
                                    }}
                                    formatter={(value: number) => {
                                        return [value.toString().concat('mins')];
                                    }}
                                />
                                <Legend
                                    verticalAlign='top'
                                    height={36}
                                    formatter={() => {
                                        return ['mins'];
                                    }}
                                />
                                <Line
                                    type='monotone'
                                    dataKey='value'
                                    stroke='#021778'
                                />
                            </LineChart>
                        </Card>
                    ) : false}

                {surveyReports.averagePageStopped.length !== 1 && surveyReports.averagePageStopped[0].surveyName !== '' && surveyReports.averagePageStopped[0].value !== 0
                    ? (
                        <Card style={Styles.SurveyReportsChartCard}>
                            <div style={Styles.ChartCardTitleContainer}>
                                <div style={Styles.ChartCardTitle}>
                                    Average Page Stopped
                                </div>

                                <div style={Styles.ChartCardDescription}>
                                    {dayjs(localStartDate).format('DD/MM')}
                                    -
                                    {dayjs(localEndDate).format('DD/MM')}
                                </div>
                            </div>

                            <BarChart
                                width={600}
                                height={300}
                                margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
                                data={surveyReports.averagePageStopped.map(item => {
                                    return { surveyName: item.surveyName, value: item.value * 100 };
                                })}
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='surveyName' />
                                <YAxis unit='%' />
                                <Tooltip
                                    contentStyle={{
                                        ...Styles.ChartTooltip,
                                    }}
                                    formatter={(value: number) => {
                                        return [value.toString().concat('%')];
                                    }}
                                />
                                <Legend
                                    verticalAlign='top'
                                    height={36}
                                    formatter={() => {
                                        return ['%'];
                                    }}
                                />
                                <Bar
                                    dataKey='value'
                                    fill='#0074C0'
                                />
                            </BarChart>
                        </Card>
                    )
                    : false}
            </div>
        );
    };

    const renderStatCards = () => {
        return (
            <div style={Styles.StatCardsContainer}>
                <Card style={Styles.StatsCard}>
                    <div style={Styles.StatsCardValue}>
                        {surveyReports.totalScans || '-'}
                    </div>

                    <div>
                        Total Scans
                    </div>
                </Card>

                <Card style={Styles.StatsCard}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                        }}
                    >
                        <div style={Styles.StatsCardValue}>
                            {
                                (surveyReports.completedSurveySet.total && surveyReports.completedSurveySet.value)
                                    ? `${Math.round((surveyReports.completedSurveySet.value / surveyReports.completedSurveySet.total) * 100)}%`
                                    : '-'
                            }
                        </div>

                        <div
                            style={{
                                marginLeft: '10px',
                            }}
                        >
                            (
                            {surveyReports.completedSurveySet.value || 0}
                            /
                            {surveyReports.completedSurveySet.total || 0}
                            )
                        </div>
                    </div>

                    <div>
                        Completed the survey set
                    </div>
                </Card>

                <Card style={Styles.StatsCard}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                        }}
                    >
                        <div style={Styles.StatsCardValue}>
                            {
                                (surveyReports.completionRate.total && surveyReports.completionRate.value)
                                    ? `${Math.round((surveyReports.completionRate.value / surveyReports.completionRate.total) * 100)}%`
                                    : '-'
                            }
                        </div>

                        <div style={{ marginLeft: '10px' }}>
                            (
                            {surveyReports.completionRate.value || 0}
                            /
                            {surveyReports.completionRate.total || 0}
                            )
                        </div>
                    </div>

                    <div>
                        Average Completion Rate
                    </div>
                </Card>

                <Card style={Styles.StatsCard}>
                    <div style={Styles.StatsCardValue}>
                        {surveyReports.averageTimeSpentPerQuestion || '-'}
                    </div>

                    <div>
                        Average time taken for each question
                    </div>
                </Card>

                <Card style={Styles.StatsCard}>
                    <div style={Styles.StatsCardValue}>
                        {surveyReports.averageTimeSpent || '-'}
                    </div>

                    <div>
                        Average time spent on the survey
                    </div>
                </Card>
            </div>
        );
    };

    if (gettingSurveyReports) {
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

    if (getSurveyReportsError) {
        return (
            <div style={CampaignStyles.spinnerContainer}>
                <Text style={{ color: 'red', marginBottom: '20px' }}>{getSurveyReportsError}</Text>
                <Button
                    onClick={() => getSurveyReports({ surveyId, dateFrom: dayjs(new Date()).format('YYYY-MM-DD'), dateTo: dayjs(new Date()).format('YYYY-MM-DD') })}
                    css={CampaignItemStyles.retryButton}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div style={RewardsStyles.PageContainer}>
            <div
                style={{
                    ...RewardsStyles.divider,
                    margin: '40px auto',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '40px',
                    maxWidth: '1300px',
                }}
            >
                <div style={RewardsStyles.PageHeader}>
                    {surveyName}
                </div>

                <div
                    style={{
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                    }}
                >
                    <DatePicker
                        dateFormat='dd/MM/yyyy'
                        disabled={gettingSurveyReports}
                        startDate={localStartDate ? new Date(localStartDate) : null}
                        endDate={localEndDate ? new Date(localEndDate) : null}
                        selectsRange
                        maxDate={new Date()}
                        onChange={onDatesChange}
                    />

                    <div style={{ ...RewardsStyles.verticalDivider }} />

                    <Button
                        style={{
                            ...RewardsStyles.UploadCSVButton,
                        }}
                        onClick={() => NavActions.navToSurveyResponses({ surveyId, surveyName })}
                    >
                        VIEW INDIVIDUAL RESPONSES
                    </Button>
                </div>
            </div>

            {renderCharts()}
            {renderStatCards()}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    gettingSurveyReports: Selectors.reportsGetSurveyReportsAttempting(state),
    getSurveyReportsError: Selectors.reportsGetSurveyReportsError(state),
    surveyReports: Selectors.reportsGetSurveyReports(state),
    reportsStartDate: Selectors.reportsGetFilterStartDate(state),
    reportsEndDate: Selectors.reportsGetFilterEndDate(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getSurveyReports: (params: IGetSurveyReportsParams) => dispatch(Actions.reportsGetSurveyReportsAttempt(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyReports);
