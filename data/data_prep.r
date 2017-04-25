library(dplyr)
df <- read.csv('data/timesData.csv', stringsAsFactors = FALSE)
df <- df %>% select(-female_male_ratio)

## Create Regions ##
north.america <- c('United States of America', 'Canada', 'Mexico', 'Unisted States of America')
south.america <- c('Brazil', 'Chile', 'Colombia', 'Argentina')
europe <- c('United Kingdom', 'Switzerland', 'France', 'Sweden', 'Germany', 'Republic of Ireland',
            'Finland', 'Netherlands', 'Belgium', 'Denmark', 'Norway', 'Spain', 'Austria', 'Italy',
            'Greece', 'Czech Republic', 'Poland', 'Portugal', 'Estonia','Luxembourg', 'Unted Kingdom',
            'Cyprus', 'Romania', 'Slovenia', 'Hungary', 'Belarus', 'Serbia', 'Slovakia', 'Latvia',
            'Ukraine', 'Lithuania', 'Iceland')
middle.east <- c('Turkey', 'Israel', 'Iran', 'Saudi Arabia', 'Lebanon', 'Pakistan',
                 'United Arab Emirates', 'Jordan', 'Qatar', 'Oman')
asia <- c('Hong Kong', 'Japan', 'South Korea', 'Singapore', 'China', 'Taiwan', 'Russian Federation',
          'India', 'Thailand', 'Malaysia', 'Bangladesh')
australasia <- c('Australia', 'New Zealand', 'Macau', 'Indonesia')
northern.africa <- c('Egypt', 'Morocco')
southern.africa <- c('South Africa','Uganda', 'Ghana', 'Nigeria', 'Kenya')


## Append Regions to Rows ##
getRegion <- function(country) {
  if (country %in% north.america) {return('North America')}
  if (country %in% south.america) {return('South America')}
  if (country %in% europe) {return ('Europe')}
  if (country %in% middle.east) {return ('Middle East')}
  if (country %in% asia) {return ('Asia')}
  if (country %in% australasia) {return ('Australasia')}
  if (country %in% northern.africa ) {return ('Northern Africa')}
  if (country %in% southern.africa) {return ('Southern Africa')}
}

regions <- lapply(df$country, getRegion)
regions <- unlist(regions, use.names = FALSE)
df$region <- regions

write.csv(df, 'data/prep_data.csv', row.names = FALSE)

