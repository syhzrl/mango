import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import SVG from 'react-inlinesvg';

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Button from 'components/Button';
import DatePicker from 'react-datepicker';
import {
    Card,
} from 'reactstrap';

import { AppDispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import NavActions from 'lib/NavActions';
import { IGetReportsParams, IQrTypeEnum, IReports } from 'redux/slices/reports/types';
import Icons from 'assets/icons';

import { Oval } from 'react-loader-spinner';
import Text from 'components/Text';

import { ContainerStyles as CampaignStyles, ItemStyles as CampaignItemStyles } from 'containers/campaigns/styles/CampaignScreenStyles';
import Styles from './styles';
import RewardsStyles from '../rewards/styles';
import { ItemStyles as QrStyles } from '../qr/components/styles/QrCardStyles';

interface ReportsProps {
    gettingReports: boolean;
    getReportsError: string;
    startDate: string | null;
    endDate: string | null;
    reports: IReports;
    setStartDate: (date: string | null) => void;
    setEndDate: (date: string | null) => void;
    getReports: (params: IGetReportsParams) => void;
}

const Reports = (props: ReportsProps): JSX.Element => {
    const {
        gettingReports,
        getReportsError,
        startDate,
        endDate,
        reports,
        setStartDate,
        setEndDate,
        getReports,
    } = props;

    useEffect(() => {
        if (startDate && endDate) {
            getReports({ dateFrom: startDate, dateTo: endDate });
        }
    }, [endDate]);

    const onDatesChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;

        if (start) setStartDate(dayjs(start).format('YYYY-MM-DD'));
        if (end) setEndDate(dayjs(end).format('YYYY-MM-DD'));
    };

    const renderCharts = () => {
        if (!reports) return false;

        return (
            <div style={Styles.ChartContainer}>
                {reports.averageTimeSpentChart.length !== 1 && reports.averageTimeSpentChart[0].name !== '' && reports.averageTimeSpentChart[0].value !== 0
                    ? (
                        <Card style={Styles.SurveyReportsChartCard}>
                            <div style={Styles.ChartCardTitleContainer}>
                                <div style={Styles.ChartCardTitle}>
                                    Average Time Spent
                                </div>

                                <div style={Styles.ChartCardDescription}>
                                    {dayjs(startDate).format('DD/MM')}
                                    -
                                    {dayjs(endDate).format('DD/MM')}
                                </div>
                            </div>

                            <LineChart
                                width={600}
                                height={300}
                                margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
                                data={reports.averageTimeSpentChart}
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
                    )
                    : false}

                {reports.averagePageStopped.length !== 1 && reports.averagePageStopped[0].surveyName !== '' && reports.averagePageStopped[0].value !== 0
                    ? (
                        <Card style={Styles.SurveyReportsChartCard}>
                            <div style={Styles.ChartCardTitleContainer}>
                                <div style={Styles.ChartCardTitle}>
                                    Average Page Stopped
                                </div>

                                <div style={Styles.ChartCardDescription}>
                                    {dayjs(startDate).format('DD/MM')}
                                    -
                                    {dayjs(endDate).format('DD/MM')}
                                </div>
                            </div>

                            <BarChart
                                width={600}
                                height={300}
                                margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
                                data={reports.averagePageStopped.map(item => {
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
                        {reports.totalScans || '-'}
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
                                (reports.completedSurveySet.total && reports.completedSurveySet.value)
                                    ? `${Math.round((reports.completedSurveySet.value / reports.completedSurveySet.total) * 100)}%`
                                    : '-'
                            }
                        </div>

                        <div
                            style={{
                                marginLeft: '10px',
                            }}
                        >
                            (
                            {reports.completedSurveySet.value || 0}
                            /
                            {reports.completedSurveySet.total || 0}
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
                                (reports.completionRate.total && reports.completionRate.value)
                                    ? `${Math.round((reports.completionRate.value / reports.completionRate.total) * 100)}%`
                                    : '-'
                            }
                        </div>

                        <div style={{ marginLeft: '10px' }}>
                            (
                            {reports.completionRate.value || 0}
                            /
                            {reports.completionRate.total || 0}
                            )
                        </div>
                    </div>

                    <div>
                        Average Completion Rate
                    </div>
                </Card>

                <Card style={Styles.StatsCard}>
                    <div style={Styles.StatsCardValue}>
                        {reports.averageTimeSpentPerQuestion || '-'}
                    </div>

                    <div>
                        Average time taken for each question
                    </div>
                </Card>

                <Card style={Styles.StatsCard}>
                    <div style={Styles.StatsCardValue}>
                        {reports.averageTimeSpent || '-'}
                    </div>

                    <div>
                        Average time spent on the survey
                    </div>
                </Card>
            </div>
        );
    };

    const renderIndividualReports = () => {
        if (reports.surveyReports.length === 1 && !reports.surveyReports[0].id && !reports.surveyReports[0].name) {
            return false;
        } return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        maxWidth: '1300px',
                    }}
                >
                    <div
                        style={{
                            ...RewardsStyles.PageHeader,
                            margin: '40px 0px',
                        }}
                    >
                        Individual Report
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
                            disabled={gettingReports}
                            startDate={startDate ? new Date(startDate) : null}
                            endDate={endDate ? new Date(endDate) : null}
                            selectsRange
                            maxDate={new Date()}
                            onChange={onDatesChange}
                        />
                    </div>
                </div>
                {reports.surveyReports.map(survey => {
                    return (
                        <div
                            id={survey.id}
                            style={Styles.IndividualReportsContainer}
                        >
                            <Card style={Styles.IndividualReportsCard}>
                                <div>
                                    <div
                                        style={{
                                            fontSize: '26px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {survey.name}
                                    </div>

                                    <div
                                        style={{
                                            color: '#888888',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        {survey.description}
                                    </div>

                                    <div style={Styles.IndividualReportSurveyInfo}>
                                        <SVG
                                            src={Icons.Clock}
                                            style={{ marginRight: '5px' }}
                                        />
                                        {survey.createdAt}
                                    </div>

                                    <div style={Styles.IndividualReportSurveyInfo}>
                                        <SVG
                                            src={Icons.Setting}
                                            style={{ marginRight: '5px' }}
                                        />
                                        Answered
                                        {survey.type === IQrTypeEnum.AnswerOnce ? ' Once by Customers' : ' Multiple by Customers'}
                                    </div>

                                    <div>
                                        <Button
                                            css={[
                                                ...QrStyles.moreDetailsButton,
                                                `
                                     width: auto;
                                     margin-top: 50px;
                                    `,
                                            ]}
                                            onClick={() => {
                                                if (survey.id && survey.name) NavActions.navToSurveyReports({ surveyId: survey.id, surveyName: survey.name });
                                            }}
                                        >
                                            MORE DETAILS
                                        </Button>
                                    </div>
                                </div>

                                <div style={{ ...RewardsStyles.verticalDivider, height: 'auto', margin: '0px 30px 0px 20px' }} />

                                <div style={Styles.IndividualReportsRightContainer}>
                                    <div style={{ display: 'flex' }}>
                                        <Card style={Styles.IndividualReportsCardStats}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                }}
                                            >
                                                <div style={Styles.StatsCardValue}>
                                                    {survey.answeredCompletely || '-'}
                                                </div>

                                                <div style={{ marginLeft: '10px' }}>
                                                    Answered Completely
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <Card style={Styles.IndividualReportsCardStats}>
                                            <div style={Styles.StatsCardValue}>
                                                {(survey.averageCompletionRate * 100).toString().concat('%') || '-'}
                                            </div>

                                            <div>
                                                Average completion rate
                                            </div>
                                        </Card>

                                        <Card style={Styles.IndividualReportsCardStats}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                }}
                                            >
                                                <div style={Styles.StatsCardValue}>
                                                    {
                                                        (survey.completedSurveySet.total && survey.completedSurveySet.value)
                                                            ? `${Math.round((survey.completedSurveySet.value / survey.completedSurveySet.total) * 100)}%`
                                                            : '-'
                                                    }
                                                </div>

                                                <div style={{ marginLeft: '10px' }}>
                                                    (
                                                    {reports.completionRate.value || 0}
                                                    /
                                                    {reports.completionRate.total || 0}
                                                    )
                                                </div>
                                            </div>

                                            <div>
                                                Completed the survey set
                                            </div>
                                        </Card>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <Card style={Styles.IndividualReportsCardStats}>
                                            <div style={Styles.StatsCardValue}>
                                                {survey.averageTimeSpentPerQuestion || '-'}
                                            </div>

                                            <div>
                                                Average time taken for each question
                                            </div>
                                        </Card>

                                        <Card style={Styles.IndividualReportsCardStats}>
                                            <div style={Styles.StatsCardValue}>
                                                {(survey.averageTimeSpent).toString().concat('mins') || '-'}
                                            </div>

                                            <div>
                                                Average time spent on the survey
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    };

    if (gettingReports) {
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

    if (getReportsError) {
        return (
            <div style={CampaignStyles.spinnerContainer}>
                <Text style={{ color: 'red', marginBottom: '20px' }}>{getReportsError}</Text>
                <Button
                    onClick={() => getReports({ dateFrom: dayjs(new Date()).format('YYYY-MM-DD'), dateTo: dayjs(new Date()).format('YYYY-MM-DD') })}
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
                    Site Analytics
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
                        disabled={gettingReports}
                        startDate={startDate ? new Date(startDate) : null}
                        endDate={endDate ? new Date(endDate) : null}
                        selectsRange
                        maxDate={new Date()}
                        onChange={onDatesChange}
                    />

                    {/* <div style={{ ...RewardsStyles.verticalDivider }} />

                    <Button
                        style={{
                            ...RewardsStyles.UploadCSVButton,
                        }}
                        onClick={() => console.log('Export csv here')}
                    >
                        EXPORT REPORT (.CSV)
                    </Button> */}
                </div>
            </div>

            {renderCharts()}
            {renderStatCards()}
            {renderIndividualReports()}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    gettingReports: Selectors.reportsGetReportsAttempting(state),
    getReportsError: Selectors.reportsGetReportsError(state),
    startDate: Selectors.reportsGetFilterStartDate(state),
    endDate: Selectors.reportsGetFilterEndDate(state),
    reports: Selectors.reportsGetReports(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setStartDate: (date: string | null) => dispatch(Actions.reportsSetFilterStartDate(date)),
    setEndDate: (date: string | null) => dispatch(Actions.reportsSetFilterEndDate(date)),
    getReports: (params: IGetReportsParams) => dispatch(Actions.reportsGetReportsAttempt(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
