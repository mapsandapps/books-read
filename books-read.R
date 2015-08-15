library(ggplot2)
library(plyr)

monthly <- read.csv("books-read.csv", header = TRUE)
monthly <- transform(monthly, Month = factor(Month, levels = c("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")))
annual <- ddply(monthly, "Year", summarize,
	Books = sum(Books))


resize.win <- function(Width = 7, Height = 7)
{
  dev.off()
  quartz(width = Width, height = Height)
}
resize.win(7, 4)
ggplot(annual,
	aes(x = Year, y = Books)) +
		geom_bar(stat = 'identity',
      fill = "#f07300") +
    geom_text(aes(x = Year, y = Books,
        ymax = Books,
        label = Books,
        hjust = -0.3),
      size = 4) +
    scale_x_reverse(breaks = seq(min(annual$Year), max(annual$Year), 1)) +
		coord_flip()
dev.copy(png, 'graphs/annual.png',
  width = 480,
  height = 280)
dev.off()

goal <- 4.17
ggplot(monthly[monthly$Year == 2014,],
  aes(x = Month, y = Books,
    group = 1)) +
  geom_vline(xintercept = c(2, 4, 6, 8, 10, 12), color = "white") +
  geom_hline(yintercept = goal,
    linetype = "dashed") +
  geom_line(color = "#f07300") +
  geom_point(stat = "identity",
      color = "#f07300") +
  # geom_text(aes(0, goal,
  #   label = "Goal",
  #   hjust = 0,
  #   vjust = 2)) +
  # scale_y_continuous(breaks = sort(c(seq(min(monthly$Books), max(monthly$Books), length.out = 5), goal))) +
  scale_x_discrete(breaks = c("January", "March", "May", "July", "September", "November"))
dev.copy(png, 'graphs/monthly-2014.png',
  width = 480,
  height = 280)
dev.off()


