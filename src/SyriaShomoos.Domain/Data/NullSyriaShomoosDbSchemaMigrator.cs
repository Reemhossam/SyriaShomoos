using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace SyriaShomoos.Data;

/* This is used if database provider does't define
 * ISyriaShomoosDbSchemaMigrator implementation.
 */
public class NullSyriaShomoosDbSchemaMigrator : ISyriaShomoosDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
