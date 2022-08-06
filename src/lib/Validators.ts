const ValidateCreateNewCampaign = (name: string): string => {
    if (!name || !name.trim().length) return 'Campaign name cannot be empty';

    return '';
};

export default {
    ValidateCreateNewCampaign,
};
