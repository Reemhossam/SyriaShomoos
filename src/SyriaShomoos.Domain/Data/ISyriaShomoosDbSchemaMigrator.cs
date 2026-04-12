using System.Threading.Tasks;

namespace SyriaShomoos.Data;

public interface ISyriaShomoosDbSchemaMigrator
{
    Task MigrateAsync();
}
