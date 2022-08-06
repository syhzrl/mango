const ChartContainer = {
    display: 'flex',
    marginBottom: '20px',
    maxWidth: '1300px',
    justifyContent: 'space-between',
};

const SurveyReportsChartCard = {
    maxWidth: '640px',
    minWidth: '640px',
    borderColor: '#E6F0EE',
    padding: '20px 0px 0px',
    boxShadow: '0px 2px 11px #0000000A',
    marginBottom: '20px',
};

const ChartCardTitleContainer = {
    margin: '0px 0px 20px 20px',
    maxWidth: '300px',
};

const ChartCardTitle = {
    fontSize: '20px',
    fontWeight: 'bold',
};

const ChartCardDescription = {
    fontSize: '15px',
    color: '#888888',
};

const ChartTooltip = {
    borderRadius: '10px',
    width: 'auto',
    background: '#F6F6F6',
    color: 'black',
    fontSize: '20px',
    textAlign: 'center',
} as const;

const StatsCard = {
    padding: '5px 15px 15px',
    margin: '0px 0px 20px',
    minWidth: '300px',
    minHeight: '100px',
    width: 'auto',
    border: 0,
    boxShadow: '0px 5px 108px #0000000D',
    color: '#888888',
} as const;

const StatsCardValue = {
    fontSize: '42px',
    color: '#0074C0',
    fontWeight: 'bold',
} as const;

const IndividualReportsCardStats = {
    margin: '0px 0px 20px',
    border: 0,
    width: '50%',
    padding: '0px 15px 0px 0px',
    color: '#888888',
} as const;

const StatCardsContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1300px',
    minWidth: '1300px',
    marginBottom: '20px',
    flexWrap: 'wrap',
} as const;

const IndividualReportsContainer = {
    maxWidth: '1300px',
    minWidth: '1300px',
    marginBottom: '20px',
};

const IndividualReportsCard = {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
} as const;

const IndividualReportsRightContainer = {
    minWidth: '45%',
    maxWidth: '45%',
} as const;

const IndividualReportSurveyInfo = {
    color: '#888888',
    display: 'flex',
    alignItems: 'center',
} as const;

const SurveyResponsesHeaderContainer = {
    padding: '20px 0px',
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '700px',
} as const;

const SurveyResponsesChartCards = {
    padding: '20px 30px',
    border: 0,
    marginBottom: '30px',
    boxShadow: '0px 5px 108px #0000000D',
};

const SurveyResponseChartCardTitle = {
    fontSize: '24px',
    fontWeight: 'bold',
};

export default {
    ChartContainer,
    SurveyReportsChartCard,
    ChartCardTitleContainer,
    ChartCardTitle,
    ChartCardDescription,
    ChartTooltip,
    StatsCard,
    StatsCardValue,
    IndividualReportsCardStats,
    StatCardsContainer,
    IndividualReportsContainer,
    IndividualReportsCard,
    IndividualReportsRightContainer,
    IndividualReportSurveyInfo,
    SurveyResponsesHeaderContainer,
    SurveyResponsesChartCards,
    SurveyResponseChartCardTitle,
};
