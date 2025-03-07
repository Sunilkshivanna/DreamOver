const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('updateScore', async (data) => {
        const { matchId, playerId, runs, wickets } = data;

        await Match.findByIdAndUpdate(matchId, {
            $push: { scores: { playerId, runs, wickets } }
        });

        io.emit('scoreUpdated', { matchId, playerId, runs, wickets });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const leaderboardRoutes = require('./routes/leaderboardRoutes');
app.use('/api/leaderboard', leaderboardRoutes);
