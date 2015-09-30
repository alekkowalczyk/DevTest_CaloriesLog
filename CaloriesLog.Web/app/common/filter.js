function Filter($location)
{
    this.isFilterActive = false;
    this.isFilterDateActive = true;
    this.isFilterTimeActive = false;
    this.dateFrom = null;
    this.dateTo = null;
    this.timeFrom = null;
    this.timeTo = null;
    this.isFilteredDataLoaded = true;
    this.clearDates = function()
    {
        this.dateFrom = null;
        this.dateTo = null;
    };
    this.clearTimes = function () {
        this.timeFrom = null;
        this.timeTo = null;
    };


    this.exportToQueryString = function () {
        if (this.dateFrom) {
            this.dateFrom.setHours(15);
            $location.search('dateFrom', this.dateFrom.toJSON().substring(0, 10));
        }
        else
            $location.search('dateFrom', null);
        if (this.dateTo) {
            this.dateTo.setHours(15);
            $location.search('dateTo', this.dateTo.toJSON().substring(0, 10));
        }
        else
            $location.search('dateTo', null);
        if (this.timeFrom)
            $location.search('timeFrom', this.timeFrom.toJSON().substring(11, 16).replace(':', '-'));
        else
            $location.search('timeFrom', null);
        if (this.timeTo)
            $location.search('timeTo', this.timeTo.toJSON().substring(11, 16).replace(':', '-'));
        else
            $location.search('timeTo', null);
    };
    this.importFromQueryString = function () {
        var queryString = $location.search();
        if (queryString.dateFrom) {
            this.isFilterActive = true;
            this.isFilterDateActive = true;
            this.dateFrom = new Date(queryString.dateFrom + 'T15:00Z');
        }
        if (queryString.dateTo) {
            this.isFilterActive = true;
            this.isFilterDateActive = true;
            this.dateTo = new Date(queryString.dateTo + 'T15:00Z');
        }
        if (queryString.timeFrom) {
            this.isFilterActive = true;
            this.isFilterTimeActive = true;
            this.timeFrom = new Date('2014-12-01T' + queryString.timeFrom.replace('-', ':') + 'Z');
        }
        if (queryString.timeTo) {
            this.isFilterActive = true;
            this.isFilterTimeActive = true;
            this.timeTo = new Date('2014-12-01T' + queryString.timeTo.replace('-', ':') + 'Z');
        }
    };
}